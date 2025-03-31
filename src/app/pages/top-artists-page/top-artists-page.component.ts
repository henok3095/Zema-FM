// src/app/pages/top-artists-page/top-artists-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
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
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
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
  currentView: 'list' | 'grid2' | 'grid3' = 'list'; // Default to list view
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

  setView(view: 'list' | 'grid2' | 'grid3', event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    console.log('Before setView - currentView:', this.currentView, 'new view:', view);
    this.currentView = view;
    console.log('After setView - currentView:', this.currentView);
  }

  logout() {
    // Implement logout logic if needed
  }
}