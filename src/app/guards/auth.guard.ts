// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    console.log('AuthGuard: Checking authentication');
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuard: isAuthenticated:', isAuthenticated);

    if (isAuthenticated) {
      return true;
    }

    // If not authenticated, attempt to refresh the token
    try {
      console.log('AuthGuard: Token expired or missing, attempting to refresh');
      await this.authService.refreshAccessToken();
      const isAuthenticatedAfterRefresh = this.authService.isAuthenticated();
      console.log('AuthGuard: isAuthenticated after refresh:', isAuthenticatedAfterRefresh);
      if (isAuthenticatedAfterRefresh) {
        return true;
      }
    } catch (error) {
      console.error('AuthGuard: Failed to refresh token:', error);
    }

    console.log('AuthGuard: Redirecting to /login');
    this.router.navigate(['/login']);
    return false;
  }
}