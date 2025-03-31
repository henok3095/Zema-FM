// src/app/pages/top-genres-page/top-genres-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Translations } from '../../interfaces/translations.interface';

@Component({
  selector: 'app-top-genres-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './top-genres-page.component.html',
  styleUrls: ['./top-genres-page.component.css'],
})
export class TopGenresPageComponent implements OnInit {
  genres: string[] = [];
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
    this.dataService.topGenres$.subscribe((genres) => {
      this.genres = genres;
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