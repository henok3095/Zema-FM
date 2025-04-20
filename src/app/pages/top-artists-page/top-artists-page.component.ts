import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Added for ngModel
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TimeRangeComponent } from '../../components/time-range/time-range.component'; // Added for time range
import { Translations } from '../../interfaces/translations.interface';

interface Artist {
  id: string; // Ensure id is included
  name: string;
  image: string;
  genres?: string[]; // Optional, since not all pages may use genres
}

@Component({
  selector: 'app-top-artists-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, TimeRangeComponent], // Added FormsModule and TimeRangeComponent
  templateUrl: './top-artists-page.component.html',
  styleUrls: ['./top-artists-page.component.css'],
})
export class TopArtistsPageComponent implements OnInit {
  artists: Artist[] = [
    { id: '1', name: 'Artist 1', image: 'path-to-image1.jpg' },
    { id: '2', name: 'Artist 2', image: 'path-to-image2.jpg' },
    { id: '3', name: 'Artist 3', image: 'path-to-image3.jpg' },
    { id: '4', name: 'Artist 4', image: 'path-to-image4.jpg' },
    { id: '5', name: 'Artist 5', image: 'path-to-image5.jpg' },
  ];
  isDarkMode: boolean = false;
  currentView: 'list' | 'grid2' | 'grid3' | 'grid5' = 'list'; // Added grid5
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'; // Added for time range
  translations: { en: Translations; am: Translations } = {
    en: {
      topArtists: '',
      topTracks: '',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: '',
      mediumTerm: '',
      longTerm: '',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: '',
      showMore: '',
      showLess: '',
      seeMore: ''
    },
    am: {
      topArtists: '',
      topTracks: '',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: '',
      mediumTerm: '',
      longTerm: '',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: '',
      showMore: '',
      showLess: '',
      seeMore: ''
    }
  };
  currentLanguage: 'en' | 'am' = 'en';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.topArtists$.subscribe((artists) => {
      this.artists = artists;
    });
    this.dataService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.dataService.translations$.subscribe((translations: { en: Translations; am: Translations }) => {
      this.translations = translations;
    });
    this.dataService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
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

  onTimeRangeChange(timeRange: 'short_term' | 'medium_term' | 'long_term') {
    this.timeRange = timeRange;
    // Add logic to fetch artists based on the selected time range if needed
    console.log('Time range changed to:', this.timeRange);
  }

  logout() {
    // Implement logout logic if needed
  }
}