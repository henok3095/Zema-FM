import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../src/app/services/auth.service'; 
import { SpotifyService } from '../src/app/services/spotify.service'; 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthService,
    SpotifyService,
  ],
}).catch(err => console.error(err));