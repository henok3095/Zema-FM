// src/app/components/top-tracks/top-tracks.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Translations } from '../../interfaces/translations.interface';
import { Track } from '../../types/track';

@Component({
  selector: 'app-top-tracks',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css'],
})
export class TopTracksComponent implements OnInit {
  @Input() filteredTracks: Track[] = [];
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key in 'en' | 'am']: Translations } = {
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
      shortTerm: 'አጭር ጊዜ',
      mediumTerm: 'መካከለኛ ጊዜ',
      longTerm: 'ረጅም ጊዜ',
      nowPlaying: 'አሁን እየተጫወተ ነው',
      logout: 'ውጣ',
      toggleLanguage: 'Switch to English',
      toggleTheme: 'ቀይር ወደ',
      noResults: 'የምስራች የምስራች',
      showMore: 'የምስራች የምስራች',
      showLess: 'የምስራች የምስራች',
      seeMore: 'የምስ� raች የምስራች'
    }
  };
  @Input() currentLanguage: 'en' | 'am' = 'en';

  topTracks: Track[] = [];
  visibleTracks: Track[] = [];
  spotifyPlayerUrl: string | null = null;

  ngOnInit() {
    this.topTracks = this.filteredTracks;
    this.visibleTracks = this.topTracks.slice(0, 10);
  }

  ngOnChanges() {
    this.topTracks = this.filteredTracks;
    this.visibleTracks = this.topTracks.slice(0, 10);
  }

  toggleFavorite(track: Track) {
    // Implementation for toggling favorite status
  }

  isFavorite(track: Track): boolean {
    // Implementation for checking favorite status
    return false;
  }
}