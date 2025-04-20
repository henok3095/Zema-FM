import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Added for ngModel
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TimeRangeComponent } from '../../components/time-range/time-range.component'; // Added for time range
import { Translations } from '../../interfaces/translations.interface';

interface Album {
  name: string;
  image: string;
}

@Component({
  selector: 'app-top-albums-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, TimeRangeComponent], // Added FormsModule and TimeRangeComponent
  templateUrl: './top-albums-page.component.html',
  styleUrls: ['./top-albums-page.component.css'],
})
export class TopAlbumsPageComponent implements OnInit {
  albums: Album[] = [];
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
    this.dataService.topAlbums$.subscribe((albums) => {
      this.albums = albums;
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
    // Add logic to fetch albums based on the selected time range if needed
    console.log('Time range changed to:', this.timeRange);
  }

  logout() {
    // Implement logout logic if needed
  }
}