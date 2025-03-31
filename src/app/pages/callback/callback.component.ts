// src/app/pages/callback/callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-screen flex items-center justify-center bg-black text-white">
      <p>Processing Spotify login...</p>
      <p *ngIf="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    console.log('CallbackComponent: Constructor called');
  }

  ngOnInit() {
    console.log('CallbackComponent: ngOnInit triggered');
    // Extract the authorization code from the query parameters
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    console.log('CallbackComponent: Query parameters:', { code, error });

    if (error) {
      console.error('CallbackComponent: Spotify returned an error:', error);
      this.errorMessage = `Spotify authorization failed: ${error}. Redirecting to login...`;
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    if (!code) {
      console.error('CallbackComponent: No authorization code found in URL');
      this.errorMessage = 'No authorization code found in URL. Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    console.log('CallbackComponent: Calling AuthService.handleCallback with code:', code);
    this.authService.handleCallback(code)
      .then(() => {
        console.log('CallbackComponent: Token processing completed successfully');
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.error('CallbackComponent: Token processing failed:', error);
        let errorMessage = 'Login failed. Redirecting to login...';
        if (error instanceof Error) {
          errorMessage = `Login failed: ${error.message}. Redirecting to login...`;
        } else if (error.error && error.error.error) {
          errorMessage = `Login failed: ${error.error.error_description || error.error.error}. Redirecting to login...`;
        }
        this.errorMessage = errorMessage;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      });
  }
}