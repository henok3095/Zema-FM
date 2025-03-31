// src/app/services/spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private async getHeaders(): Promise<HttpHeaders> {
    let token = this.authService.getAccessToken();
    console.log('SpotifyService: Access token:', token);
    if (!token) {
      console.error('SpotifyService: No access token found');
      throw new Error('No access token found');
    }
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      // Test the token with a simple request
      await firstValueFrom(
        this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
          catchError(error => {
            const err = error as { status: number }; // Type the error for status
            if (err.status === 401) {
              throw new Error('Token expired');
            }
            throw error;
          })
        )
      );
      return headers;
    } catch (error: unknown) {
      const err = error as Error; // Cast error to Error
      if (err.message === 'Token expired') {
        console.log('SpotifyService: Token expired, attempting to refresh');
        await this.authService.refreshAccessToken();
        token = this.authService.getAccessToken();
        if (!token) {
          throw new Error('Failed to refresh token');
        }
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
      throw error;
    }
  }

  getUserProfile(): Observable<any> {
    console.log('SpotifyService: getUserProfile called');
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
          tap(data => console.log('SpotifyService: getUserProfile response:', data)),
          catchError(error => {
            console.error('SpotifyService: getUserProfile error:', error);
            console.error('SpotifyService: getUserProfile error status:', error.status);
            console.error('SpotifyService: getUserProfile error message:', error.message);
            return throwError(() => new Error('Failed to fetch user profile: ' + (error.message || error.statusText)));
          })
        )
      )
    );
  }

  getTopArtists(timeRange: string): Observable<any> {
    console.log('SpotifyService: getTopArtists called with timeRange:', timeRange);
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.http.get(`${this.apiUrl}/me/top/artists?time_range=${timeRange}&limit=50`, { headers }).pipe(
          tap(data => console.log('SpotifyService: getTopArtists response:', data)),
          catchError(error => {
            console.error('SpotifyService: getTopArtists error:', error);
            console.error('SpotifyService: getTopArtists error status:', error.status);
            console.error('SpotifyService: getTopArtists error message:', error.message);
            return throwError(() => new Error('Failed to fetch top artists: ' + (error.message || error.statusText)));
          })
        )
      )
    );
  }

  getTopTracks(timeRange: string): Observable<any> {
    console.log('SpotifyService: getTopTracks called with timeRange:', timeRange);
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.http.get(`${this.apiUrl}/me/top/tracks?time_range=${timeRange}&limit=50`, { headers }).pipe(
          tap(data => console.log('SpotifyService: getTopTracks response:', data)),
          catchError(error => {
            console.error('SpotifyService: getTopTracks error:', error);
            console.error('SpotifyService: getTopTracks error status:', error.status);
            console.error('SpotifyService: getTopTracks error message:', error.message);
            return throwError(() => new Error('Failed to fetch top tracks: ' + (error.message || error.statusText)));
          })
        )
      )
    );
  }

  getRecentlyPlayed(limit: number): Observable<any> {
    console.log('SpotifyService: getRecentlyPlayed called with limit:', limit);
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.http.get(`${this.apiUrl}/me/player/recently-played?limit=${limit}`, { headers }).pipe(
          tap(data => console.log('SpotifyService: getRecentlyPlayed response:', data)),
          catchError(error => {
            console.error('SpotifyService: getRecentlyPlayed error:', error);
            console.error('SpotifyService: getRecentlyPlayed error status:', error.status);
            console.error('SpotifyService: getRecentlyPlayed error message:', error.message);
            return throwError(() => new Error('Failed to fetch recently played tracks: ' + (error.message || error.statusText)));
          })
        )
      )
    );
  }

  getCurrentlyPlaying(): Observable<any> {
    console.log('SpotifyService: getCurrentlyPlaying called');
    return from(this.getHeaders()).pipe(
      switchMap(headers =>
        this.http.get(`${this.apiUrl}/me/player/currently-playing`, { headers }).pipe(
          tap(data => console.log('SpotifyService: getCurrentlyPlaying response:', data)),
          catchError(error => {
            console.error('SpotifyService: getCurrentlyPlaying error:', error);
            console.error('SpotifyService: getCurrentlyPlaying error status:', error.status);
            console.error('SpotifyService: getCurrentlyPlaying error message:', error.message);
            if (error.status === 204) {
              return throwError(() => new Error('No track currently playing'));
            }
            return throwError(() => new Error('Failed to fetch currently playing track: ' + (error.message || error.statusText)));
          })
        )
      )
    );
  }
}