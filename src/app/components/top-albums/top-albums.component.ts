// src/app/components/top-albums/top-albums.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Translations } from '../../interfaces/translations.interface';
import { Album } from '../../types/album';

@Component({
  selector: 'app-top-albums',
  standalone: true,
  imports: [CommonModule, RouterModule], // Removed MatIconModule since it's not used
  templateUrl: './top-albums.component.html',
  styleUrls: ['./top-albums.component.css'],
})
export class TopAlbumsComponent implements OnInit {
  @Input() filteredAlbums: Album[] = [];
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
      seeMore: 'የምስራች የምስራች'
    }
  };
  @Input() currentLanguage: 'en' | 'am' = 'en';

  topAlbums: Album[] = [];
  visibleAlbums: Album[] = [];

  ngOnInit() {
    this.topAlbums = this.filteredAlbums;
    this.visibleAlbums = this.topAlbums.slice(0, 10);
  }

  ngOnChanges() {
    this.topAlbums = this.filteredAlbums;
    this.visibleAlbums = this.topAlbums.slice(0, 10);
  }
}