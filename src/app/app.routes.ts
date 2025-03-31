// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopArtistsPageComponent } from './pages/top-artists-page/top-artists-page.component';
import { TopTracksPageComponent } from './pages/top-tracks-page/top-tracks-page.component';
import { TopAlbumsPageComponent } from './pages/top-albums-page/top-albums-page.component';
import { RecentlyPlayedPageComponent } from './pages/recently-played-page/recently-played-page.component';
import { TopGenresPageComponent } from './pages/top-genres-page/top-genres-page.component';
import { FavoriteTracksPageComponent } from './pages/favorite-tracks-page/favorite-tracks-page.component';
import { LoginComponent } from './pages/login/login.component';
import { CallbackComponent } from './pages/callback/callback.component'; // Added import for CallbackComponent
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent }, // Fixed: Use CallbackComponent instead of LoginComponent
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'top-artists', component: TopArtistsPageComponent, canActivate: [AuthGuard] },
  { path: 'top-tracks', component: TopTracksPageComponent, canActivate: [AuthGuard] },
  { path: 'top-albums', component: TopAlbumsPageComponent, canActivate: [AuthGuard] },
  { path: 'recently-played', component: RecentlyPlayedPageComponent, canActivate: [AuthGuard] },
  { path: 'top-genres', component: TopGenresPageComponent, canActivate: [AuthGuard] },
  { path: 'favorite-tracks', component: FavoriteTracksPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];