// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

// Define the token response interface
interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string; // Optional, as refresh_token may not be returned in refresh response
}

// Define the Spotify user profile interface
interface SpotifyUserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = environment.spotifyClientId;
  private redirectUri = environment.redirectUri;
  private scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-modify-playback-state',
  ];
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpiry = new BehaviorSubject<number | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private refreshToken: string | null = null;
  private hasAuthorized: boolean = false;
  private isInitialized = new BehaviorSubject<boolean>(false);
  private codeVerifier: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    console.log('AuthService: Constructor called');
    if (isPlatformBrowser(this.platformId)) {
      this.hasAuthorized = localStorage.getItem('has_authorized') === 'true';
      console.log('AuthService: Running in browser, hasAuthorized:', this.hasAuthorized);
      this.initialize();
    } else {
      console.log('AuthService: Not in browser, skipping localStorage access');
    }
  }

  private initialize(): void {
    console.log('AuthService: Initializing');
    this.loadToken();
    this.isInitialized.next(true);
  }

  isReady(): BehaviorSubject<boolean> {
    return this.isInitialized;
  }

  isAuthenticated(): boolean {
    const token = this.tokenSubject.value;
    const expiry = this.tokenExpiry.value;
    const isAuthenticated = !!(token && expiry && Date.now() < expiry);
    console.log('AuthService: isAuthenticated called:', {
      isAuthenticated,
      token,
      expiry,
      currentTime: Date.now(),
    });
    return isAuthenticated;
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  getUserId(): string | null {
    const userId = this.userIdSubject.value || localStorage.getItem('spotify_user_id');
    console.log('AuthService: getUserId called:', userId);
    return userId;
  }

  async setTokens(accessToken: string, expiresIn: number, refreshToken: string, userId: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping token setting');
      return;
    }
    const expiresInMs = expiresIn * 1000;
    const expiryTime = Date.now() + expiresInMs;
    console.log('AuthService: Setting tokens:', { accessToken, expiresIn, refreshToken, userId, expiryTime });
    localStorage.setItem('spotify_token', accessToken);
    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
    localStorage.setItem('spotify_refresh_token', refreshToken);
    localStorage.setItem('spotify_user_id', userId);
    localStorage.setItem('has_authorized', 'true');
    this.hasAuthorized = true;
    this.tokenSubject.next(accessToken);
    this.tokenExpiry.next(expiryTime);
    this.refreshToken = refreshToken;
    this.userIdSubject.next(userId);
    console.log('AuthService: Tokens set in localStorage:', {
      token: localStorage.getItem('spotify_token'),
      expiry: localStorage.getItem('spotify_token_expiry'),
      refreshToken: localStorage.getItem('spotify_refresh_token'),
      userId: localStorage.getItem('spotify_user_id'),
      hasAuthorized: localStorage.getItem('has_authorized'),
    });
  }

  async refreshAccessToken(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping token refresh');
      throw new Error('Cannot refresh token in non-browser environment');
    }
    if (!this.refreshToken) {
      console.error('AuthService: No refresh token available');
      throw new Error('No refresh token available');
    }
    try {
      console.log('AuthService: Refreshing access token');
      const response = await firstValueFrom(
        this.http.post<TokenResponse>('https://accounts.spotify.com/api/token', null, {
          params: {
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
            client_id: this.clientId,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      );
      const accessToken = response.access_token;
      const expiresIn = response.expires_in;
      const newRefreshToken = response.refresh_token || this.refreshToken;
      const expiresInMs = expiresIn * 1000;
      const expiryTime = Date.now() + expiresInMs;
      console.log('AuthService: Token refreshed successfully:', { accessToken, expiresIn, newRefreshToken });
      localStorage.setItem('spotify_token', accessToken);
      localStorage.setItem('spotify_token_expiry', expiryTime.toString());
      localStorage.setItem('spotify_refresh_token', newRefreshToken);
      this.tokenSubject.next(accessToken);
      this.tokenExpiry.next(expiryTime);
      this.refreshToken = newRefreshToken;
    } catch (error) {
      console.error('AuthService: Failed to refresh token:', error);
      this.logout();
      throw error;
    }
  }

  private loadToken(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping token load');
      return;
    }
    const token = localStorage.getItem('spotify_token');
    const expiry = localStorage.getItem('spotify_token_expiry')
      ? parseInt(localStorage.getItem('spotify_token_expiry')!)
      : null;
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    const userId = localStorage.getItem('spotify_user_id');
    console.log('AuthService: Loading token:', token, 'Expiry:', expiry, 'RefreshToken:', refreshToken, 'UserId:', userId, 'Current Time:', Date.now());
    if (token && expiry && refreshToken && userId) {
      this.refreshToken = refreshToken;
      if (Date.now() < expiry) {
        console.log('AuthService: Token is valid, setting tokenSubject');
        this.tokenSubject.next(token);
        this.tokenExpiry.next(expiry);
        this.userIdSubject.next(userId);
      } else {
        console.log('AuthService: Token expired, will attempt to refresh on next API call');
        this.tokenSubject.next(null);
        this.tokenExpiry.next(null);
      }
    } else {
      console.log('AuthService: No token or refresh token found, clearing tokenSubject');
      this.tokenSubject.next(null);
      this.tokenExpiry.next(null);
      this.userIdSubject.next(null);
      this.refreshToken = null;
    }
  }

  // Generate a random string for the code verifier
  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Generate the code challenge from the code verifier
  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async login(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping login');
      return;
    }
    console.log('AuthService: Initiating Spotify login');
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_user_id');
    localStorage.removeItem('has_authorized');
    this.hasAuthorized = false;
    this.tokenSubject.next(null);
    this.tokenExpiry.next(null);
    this.userIdSubject.next(null);
    this.refreshToken = null;

    // Generate PKCE code verifier and challenge
    this.codeVerifier = this.generateRandomString(128);
    const codeChallenge = await this.generateCodeChallenge(this.codeVerifier);
    localStorage.setItem('code_verifier', this.codeVerifier);
    console.log('AuthService: Generated code_verifier:', this.codeVerifier); // Log the code_verifier

    const showDialog = !this.hasAuthorized;
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scopes.join(' '))}&show_dialog=${showDialog}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    console.log('AuthService: Redirecting to:', authUrl);
    window.location.href = authUrl;
  }

  // Updated handleCallback method
  async handleCallback(code: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping callback handling');
      throw new Error('Cannot handle callback in non-browser environment');
    }

    console.log('AuthService: Handling callback with code:', code);
    this.codeVerifier = localStorage.getItem('code_verifier');
    console.log('AuthService: Retrieved code_verifier:', this.codeVerifier); // Log the retrieved code_verifier
    if (!this.codeVerifier) {
      console.error('AuthService: No code verifier found in localStorage');
      throw new Error('Code verifier not found. Please try logging in again.');
    }

    try {
      console.log('AuthService: Exchanging code for token with params:', {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        code_verifier: this.codeVerifier,
      });
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        code_verifier: this.codeVerifier,
      });
      const response = await firstValueFrom(
        this.http.post<TokenResponse>('https://accounts.spotify.com/api/token', body.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      );
      console.log('AuthService: Token exchange successful:', response);

      const accessToken = response.access_token;
      const expiresIn = response.expires_in;
      const refreshToken = response.refresh_token || '';
      console.log('AuthService: Extracted tokens:', { accessToken, expiresIn, refreshToken });

      // Fetch user profile to get the user ID
      const userProfileResponse = await firstValueFrom(
        this.http.get<SpotifyUserProfile>('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
      const userId = userProfileResponse.id;
      console.log('AuthService: Fetched user profile with ID:', userId);

      // Store the tokens
      await this.setTokens(accessToken, expiresIn, refreshToken, userId);
      console.log('AuthService: Tokens set successfully');

      // Clear the code verifier
      this.clearCodeVerifier();
    } catch (error: any) {
      console.error('AuthService: Failed to exchange code for token:', error);
      console.error('AuthService: Error response:', error.response?.data || error.message);
      console.error('AuthService: Error status:', error.response?.status);
      throw new Error(error.response?.data?.error_description || error.message || 'Token exchange failed');
    }
  }

  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, returning null token');
      return null;
    }
    const token = this.tokenSubject.value || localStorage.getItem('spotify_token');
    const expiry = this.tokenExpiry.value || (localStorage.getItem('spotify_token_expiry') ? parseInt(localStorage.getItem('spotify_token_expiry')!) : null);
    console.log('AuthService: getAccessToken called:', token, 'Expiry:', expiry, 'Current Time:', Date.now());
    if (token && expiry && Date.now() > expiry) {
      console.log('AuthService: Token expired, will attempt to refresh on next API call');
      return null;
    }
    return token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  private clearCodeVerifier(): void {
    this.codeVerifier = null;
    localStorage.removeItem('code_verifier');
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthService: Not in browser, skipping logout');
      return;
    }
    console.log('AuthService: Logging out');
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_user_id');
    localStorage.removeItem('has_authorized');
    localStorage.removeItem('code_verifier');
    this.hasAuthorized = false;
    this.tokenSubject.next(null);
    this.tokenExpiry.next(null);
    this.userIdSubject.next(null);
    this.refreshToken = null;
    this.codeVerifier = null;
    this.isInitialized.next(false);
    this.navigateToLogin()
      .then(() => {
        console.log('AuthService: Navigated to /login');
        this.initialize();
      })
      .catch(err => {
        console.error('AuthService: Navigation to /login failed:', err);
      });
  }

  private navigateToLogin(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  private navigateToDashboard(): Promise<boolean> {
    return this.router.navigate(['/dashboard']);
  }
}