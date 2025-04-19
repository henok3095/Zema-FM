// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TimeRangeComponent } from '../../components/time-range/time-range.component';
import { TopArtistsComponent } from '../../components/top-artists/top-artists.component';
import { TopTracksComponent } from '../../components/top-tracks/top-tracks.component';
import { TopAlbumsComponent } from '../../components/top-albums/top-albums.component';
import { RecentlyPlayedComponent } from '../../components/recently-played/recently-played.component';
import { TopGenresComponent } from '../../components/top-genres/top-genres.component';
import { NoResultsComponent } from '../../components/no-results/no-results.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NowPlayingComponent } from '../../components/now-playing/now-playing.component';
import { FavoriteTracksComponent } from '../../components/favorite-tracks/favorite-tracks.component';
import { StreakComponent } from '../../components/streak/streak.component';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { first, defaultIfEmpty, tap, catchError } from 'rxjs/operators';
import { FavoriteTrack } from '../../types/favorite-track';
import { StreakService } from '../../services/streak.service';
import { Translations } from '../../interfaces/translations.interface';

// Define interfaces for type safety
interface SpotifyImage {
  url: string;
}

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  images: SpotifyImage[];
  id: string;
}

interface SpotifyArtist {
  id: string;
  name: string;
  images?: SpotifyImage[];
  genres?: string[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  album: { name: string; images: SpotifyImage[] };
  artists: { name: string }[];
  preview_url?: string | null;
}

interface SpotifyRecentlyPlayed {
  track: SpotifyTrack;
  played_at: string;
}

interface SpotifyApiResponse<T> {
  items: T[];
}

interface User {
  name: string;
  email: string;
  image: string;
  isOnline: boolean;
}

interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
}

interface Track {
  id: string;
  name: string;
  image: string;
  artist: string;
  album: string;
  albumImage: string;
  previewUrl: string | null;
}

interface Album {
  id: string;
  name: string;
  image: string;
  artist: string;
  releaseDate: string;
}

interface RecentlyPlayedTrack {
  id: string;
  name: string;
  image: string;
  artist: string;
  album: string;
  albumImage: string;
  previewUrl: string | null;
  playedAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    NavbarComponent,
    LoadingSpinnerComponent,
    UserProfileComponent,
    SearchInputComponent,
    TimeRangeComponent,
    TopArtistsComponent,
    TopTracksComponent,
    TopAlbumsComponent,
    RecentlyPlayedComponent,
    TopGenresComponent,
    NoResultsComponent,
    FooterComponent,
    NowPlayingComponent,
    // FavoriteTracksComponent,
    StreakComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isDarkMode: boolean = false;
  isInitialLoading: boolean = false; // Only for initial login load
  user: User | null = {
    name: '',
    email: '',
    image: '',
    isOnline: false,
  };
  searchQuery: string = '';
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
  filteredArtists: Artist[] = [];
  filteredTracks: Track[] = [];
  filteredAlbums: Album[] = [];
  filteredGenres: string[] = [];
  favoriteTracks: FavoriteTrack[] = [];
  translations: { [key in 'en' | 'am']: Translations } = {
    en: {
      topArtists: 'Top Artists',
      topTracks: 'Top Tracks',
      topAlbums: 'Top Albums',
      recentlyPlayed: 'Recently Played',
      topGenres: 'Top Genres',
      favoriteTracks: 'Favorite Tracks',
      showMoreStats: 'Show More Stats',
      hideMoreStats: 'Hide More Stats',
      listeningStreak: 'Listening Streak',
      days: 'Days',
      shortTerm: 'Short Term',
      mediumTerm: 'Medium Term',
      longTerm: 'Long Term',
      nowPlaying: 'Now Playing',
      logout: 'Logout',
      toggleLanguage: 'Switch to Amharic',
      toggleTheme: 'Switch to',
      noResults: 'No Results',
      showMore: 'Show More',
      showLess: 'Show Less',
      seeMore: 'See More'
    },
    am: {
      topArtists: 'ከፍተኛ አርቲስቶች',
      topTracks: 'ከፍተኛ ትራኮች',
      topAlbums: 'ከፍተኛ አልበሞች',
      recentlyPlayed: 'በቅርቡ የተጫወቱ',
      topGenres: 'ከፍተኛ ዘፈኖች',
      favoriteTracks: 'የመወያየር ትራኮች',
      showMoreStats: 'ተጨማሪ ስታትስ አሳይ',
      hideMoreStats: 'ተጨማሪ ስታትስ ደብቅ',
      listeningStreak: 'ተከታታይ ማዳመጥ',
      days: 'ቀናት',
      shortTerm: 'የየአጭር ጊዜ',
      mediumTerm: 'የየመካከለኛ ጊዜ',
      longTerm: 'የየረጅም ጊዜ',
      nowPlaying: 'አሁን እየተጫወተ ነው',
      logout: 'ውጣ',
      toggleLanguage: 'Switch to English',
      toggleTheme: 'ቀይር ወደ',
      noResults: 'ምንም የለምየለም',
      showMore: 'ብዙ አሳይ',
      showLess: 'ትንሽ አሳይ',
      seeMore: 'ብዙ አሳይ'
    }
  };
  currentLanguage: 'en' | 'am' = 'en';
  topAlbums: Album[] = [];
  recentlyPlayed: RecentlyPlayedTrack[] = [];
  topGenres: string[] = [];
  topArtists: Artist[] = [];
  topTracks: Track[] = [];
  userId: string = '';
  errorMessage: string | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private streakService: StreakService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('DashboardComponent: ngOnInit started');
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme');
      this.isDarkMode = theme === 'dark';
      this.dataService.setIsDarkMode(this.isDarkMode);
      this.applyTheme();

      const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
      this.currentLanguage = savedLanguage || 'en';
      this.dataService.setCurrentLanguage(this.currentLanguage);

      this.dataService.setTranslations(this.translations);
    }

    console.log('DashboardComponent: Waiting for AuthService to be ready');
    try {
      await new Promise<void>((resolve, reject) => {
        this.authService.isReady()
          .pipe(first(value => value === true))
          .subscribe({
            next: () => {
              console.log('DashboardComponent: AuthService is ready');
              resolve();
            },
            error: (err) => {
              console.error('DashboardComponent: AuthService isReady error:', err);
              reject(err);
            }
          });
      });
    } catch (error) {
      console.error('DashboardComponent: Failed to wait for AuthService:', error);
      this.errorMessage = 'Authentication service failed to initialize. Please try again.';
      setTimeout(() => this.router.navigate(['/login']), 3000);
      return;
    }

    const token = this.authService.getAccessToken();
    console.log('DashboardComponent: Token after AuthService init:', token);
    if (!token) {
      this.errorMessage = 'Authentication token is missing. Please log in again.';
      console.log('DashboardComponent: Redirecting to /login due to missing token');
      setTimeout(() => this.router.navigate(['/login']), 3000);
      return;
    }
    this.userId = this.authService.getUserId() || '';
    console.log('DashboardComponent: UserId after AuthService init:', this.userId);
    if (!this.userId) {
      console.error('DashboardComponent: No userId available');
      this.errorMessage = 'User ID is missing. Please log in again.';
      setTimeout(() => this.router.navigate(['/login']), 3000);
      return;
    }
    await this.loadUserData(true); // Initial load with spinner
  }

  async loadUserData(isInitialLoad: boolean = false): Promise<void> {
    console.log('DashboardComponent: loadUserData started, isInitialLoad:', isInitialLoad);
    if (isInitialLoad) {
      this.isInitialLoading = true; // Show spinner only for initial load
    }
    this.errorMessage = null;

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Data loading timed out after 10 seconds')), 10000);
    });

    try {
      console.log('DashboardComponent: Fetching data with Promise.all');
      const result = await Promise.race([
        Promise.all([
          firstValueFrom(this.spotifyService.getUserProfile().pipe(
            tap(data => console.log('DashboardComponent: getUserProfile response:', data)),
            catchError(err => {
              console.error('DashboardComponent: getUserProfile failed:', err);
              throw err;
            })
          )),
          firstValueFrom(this.spotifyService.getTopArtists(this.timeRange).pipe(
            tap(data => console.log('DashboardComponent: getTopArtists response:', data)),
            catchError(err => {
              console.error('DashboardComponent: getTopArtists failed:', err);
              throw err;
            })
          )),
          firstValueFrom(this.spotifyService.getTopTracks(this.timeRange).pipe(
            tap(data => console.log('DashboardComponent: getTopTracks response:', data)),
            catchError(err => {
              console.error('DashboardComponent: getTopTracks failed:', err);
              throw err;
            })
          )),
          firstValueFrom(this.spotifyService.getRecentlyPlayed(26).pipe(
            tap(data => console.log('DashboardComponent: getRecentlyPlayed response:', data)),
            catchError(err => {
              console.error('DashboardComponent: getRecentlyPlayed failed:', err);
              throw err;
            })
          )),
          firstValueFrom(this.dataService.favoriteTracks$.pipe(
            defaultIfEmpty([]),
            tap(data => console.log('DashboardComponent: favoriteTracks response:', data)),
            catchError(err => {
              console.error('DashboardComponent: favoriteTracks failed:', err);
              throw err;
            })
          )),
        ]),
        timeout,
      ]) as [
        SpotifyUserProfile,
        SpotifyApiResponse<SpotifyArtist>,
        SpotifyApiResponse<SpotifyTrack>,
        SpotifyApiResponse<SpotifyRecentlyPlayed>,
        FavoriteTrack[]
      ];

      console.log('DashboardComponent: Promise.all resolved');
      const [profile, artists, tracks, recentlyPlayed, favoriteTracks] = result;

      console.log('DashboardComponent: Data fetched successfully', { profile, artists, tracks, recentlyPlayed, favoriteTracks });

      if (!profile || !artists || !tracks || !recentlyPlayed) {
        throw new Error('One or more API responses are undefined');
      }

      this.user = {
        name: profile.display_name,
        email: profile.email,
        image: profile.images[0]?.url || 'https://via.placeholder.com/150',
        isOnline: true,
      };

      const typedArtists: SpotifyApiResponse<SpotifyArtist> = artists;
      this.topArtists = typedArtists.items.map((artist: SpotifyArtist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url || 'https://via.placeholder.com/150',
        genres: artist.genres || [],
      }));
      this.filteredArtists = [...this.topArtists];
      this.dataService.setTopArtists(this.filteredArtists);

      this.topTracks = tracks.items.map((track: SpotifyTrack) => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0]?.url || 'https://via.placeholder.com/150',
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album.name,
        albumImage: track.album.images[0]?.url || 'https://via.placeholder.com/150',
        previewUrl: track.preview_url || null,
      }));
      this.filteredTracks = [...this.topTracks];
      this.dataService.setTopTracks(this.filteredTracks);

      this.topAlbums = Array.from(
        new Map(
          this.topTracks.map((track) => [track.album, { id: track.id, name: track.album, image: track.albumImage, artist: track.artist, releaseDate: '' }])
        ).values()
      );
      this.filteredAlbums = [...this.topAlbums];
      this.dataService.setTopAlbums(this.filteredAlbums);

      this.topGenres = Array.from(
        new Set(this.topArtists.flatMap((artist) => artist.genres))
      ).slice(0, 10);
      this.filteredGenres = [...this.topGenres];
      this.dataService.setTopGenres(this.filteredGenres);

      this.recentlyPlayed = recentlyPlayed.items.map((item: SpotifyRecentlyPlayed) => ({
        id: item.track.id,
        name: item.track.name,
        image: item.track.album.images[0]?.url || 'https://via.placeholder.com/150',
        artist: item.track.artists[0]?.name || 'Unknown Artist',
        album: item.track.album.name,
        albumImage: item.track.album.images[0]?.url || 'https://via.placeholder.com/150',
        previewUrl: item.track.preview_url || null,
        playedAt: item.played_at,
      }));
      this.dataService.setRecentlyPlayed(this.recentlyPlayed);

      this.favoriteTracks = favoriteTracks || [];
      console.log('DashboardComponent: Data processing completed');
    } catch (error: unknown) {
      console.error('DashboardComponent: Error loading user data:', error);
      let errorMessage = 'Failed to load data from Spotify. Please try logging in again.';
      const err = error as Error;
      if (err.message.includes('401') || err.message.includes('Token expired')) {
        errorMessage = 'Your session has expired. Please log in again.';
      } else if (err.message.includes('Data loading timed out')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      }
      this.errorMessage = errorMessage;
      setTimeout(() => {
        console.log('DashboardComponent: Redirecting to /login due to error');
        this.router.navigate(['/login']);
      }, 3000);
    } finally {
      if (isInitialLoad) {
        console.log('DashboardComponent: Setting isInitialLoading to false');
        this.isInitialLoading = false;
      }
      console.log('DashboardComponent: isInitialLoading:', this.isInitialLoading, 'errorMessage:', this.errorMessage);
    }
  }

  onSearchChange(newValue: string) {
    this.searchQuery = newValue;
    this.filterResults();
  }

  filterResults() {
    const query = this.searchQuery.toLowerCase();
    this.filteredArtists = this.topArtists.filter((artist) =>
      artist.name.toLowerCase().includes(query)
    );
    this.filteredTracks = this.topTracks.filter((track) =>
      track.name.toLowerCase().includes(query)
    );
    this.filteredAlbums = this.topAlbums.filter((album) =>
      album.name.toLowerCase().includes(query)
    );
    this.filteredGenres = this.topGenres.filter((genre) =>
      genre.toLowerCase().includes(query)
    );

    this.dataService.setTopArtists(this.filteredArtists);
    this.dataService.setTopTracks(this.filteredTracks);
    this.dataService.setTopAlbums(this.filteredAlbums);
    this.dataService.setTopGenres(this.filteredGenres);
  }

  changeTimeRange(range: 'short_term' | 'medium_term' | 'long_term') {
    this.timeRange = range;
    this.loadUserData(false); // No spinner for time range change
  }

  onTimeRangeChange(event: 'short_term' | 'medium_term' | 'long_term') {
    this.changeTimeRange(event);
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      this.dataService.setIsDarkMode(this.isDarkMode);
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'am' : 'en';
    this.dataService.setCurrentLanguage(this.currentLanguage);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', this.currentLanguage);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTrackPlayed(track: FavoriteTrack) {
    console.log('DashboardComponent: Track played:', track);
    this.streakService.updateStreak(this.userId, new Date());
  }
}