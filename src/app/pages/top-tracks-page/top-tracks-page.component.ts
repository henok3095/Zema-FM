// src/app/pages/top-tracks-page/top-tracks-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TimeRangeComponent } from '../../components/time-range/time-range.component';
import { SpotifyService } from '../../services/spotify.service';
import { firstValueFrom } from 'rxjs';
import { Translations } from '../../interfaces/translations.interface';

interface Track {
  id: string;
  name: string;
  image: string;
  artist: string;
  album: string;
  albumImage: string;
  previewUrl: string | null;
}

@Component({
  selector: 'app-top-tracks-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    TimeRangeComponent
  ],
  templateUrl: './top-tracks-page.component.html',
  styleUrls: ['./top-tracks-page.component.css'],
})
export class TopTracksPageComponent implements OnInit {
  tracks: Track[] = [];
  isDarkMode: boolean = false;
  currentView: 'list' | 'grid2' | 'grid3' | 'grid5' = 'list'; // Added grid5
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
  translations: { [key in 'en' | 'am']: Translations } = {
    en: {
      topArtists: '',
      topTracks: 'Top Tracks',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: 'Short Term',
      mediumTerm: 'Medium Term',
      longTerm: 'Long Term',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: 'No tracks found.',
      showMore: '',
      showLess: '',
      seeMore: ''
    },
    am: {
      topArtists: '',
      topTracks: 'ከፍተኛ ትራኮች',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: 'የየአጭር ጊዜ',
      mediumTerm: 'የየመካከለኛ ጊዜ',
      longTerm: 'የየረጅም ጊዜ',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: 'ምንም ትራኮች አልተገኙም።',
      showMore: '',
      showLess: '',
      seeMore: ''
    }
  };
  currentLanguage: 'en' | 'am' = 'en';

  constructor(
    private dataService: DataService,
    private spotifyService: SpotifyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataService.topTracks$.subscribe((tracks) => {
      this.tracks = tracks;
    });
    this.dataService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.dataService.translations$.subscribe((translations) => {
      this.translations = translations;
    });
    this.dataService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });

    // Initial load of tracks
    await this.loadTracks();
  }

  async loadTracks(): Promise<void> {
    try {
      const tracksData = await firstValueFrom(
        this.spotifyService.getTopTracks(this.timeRange)
      );
      this.tracks = tracksData.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        image: track.album.images[0]?.url || 'https://via.placeholder.com/150',
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album.name,
        albumImage: track.album.images[0]?.url || 'https://via.placeholder.com/150',
        previewUrl: track.preview_url || null
      }));
      this.dataService.setTopTracks(this.tracks);
    } catch (error) {
      console.error('Error loading top tracks:', error);
      this.tracks = [];
      this.dataService.setTopTracks([]);
    }
  }

  toggleTheme() {
    this.dataService.setIsDarkMode(!this.isDarkMode);
  }

  toggleLanguage() {
    this.dataService.setCurrentLanguage(this.currentLanguage === 'en' ? 'am' : 'en');
  }

  setView(event: Event) {
    const target = event.target as HTMLSelectElement;
    const view = target.value as 'list' | 'grid2' | 'grid3' | 'grid5';
    console.log('Before setView - currentView:', this.currentView, 'new view:', view);
    this.currentView = view;
    console.log('After setView - currentView:', this.currentView);
  }

  async onTimeRangeChange(range: 'short_term' | 'medium_term' | 'long_term') {
    this.timeRange = range;
    await this.loadTracks(); // Fetch new tracks without spinner
  }

  logout() {
    // Implement logout logic if needed
  }
}