// src/app/pages/favorite-tracks-page/favorite-tracks-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-favorite-tracks-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './favorite-tracks-page.component.html',
  styleUrls: ['./favorite-tracks-page.component.css'],
})
export class FavoriteTracksPageComponent implements OnInit {
  isDarkMode: boolean = false; // Example: Replace with actual dark mode logic
  currentLanguage: 'en' | 'am' = 'en'; // Example: Replace with actual language logic
  translations: any = {
    en: {
      favoriteTracks: 'Favorite Tracks',
      listView: 'List View',
      grid2View: '2-Column Grid',
      grid3View: '3-Column Grid',
    },
    am: {
      favoriteTracks: 'የተወደዱ ትራኮች',
      listView: 'ዝርዝር እይታ',
      grid2View: '2-አሞሌ እይታ',
      grid3View: '3-አሞሌ እይታ',
    },
  };
  currentView: 'list' | 'grid2' | 'grid3' = 'list'; // Default view
  tracks: any[] = []; // Replace with actual data source

  ngOnInit(): void {
    // Simulate fetching favorite tracks
    this.tracks = [
      {
        name: 'Track 1',
        artist: 'Artist 1',
        image: 'https://via.placeholder.com/150',
        playCount: 120,
      },
      {
        name: 'Track 2',
        artist: 'Artist 2',
        image: 'https://via.placeholder.com/150',
        playCount: 95,
      },
      {
        name: 'Track 3',
        artist: 'Artist 3',
        image: 'https://via.placeholder.com/150',
        playCount: 80,
      },
    ];
  }

  setView(view: 'list' | 'grid2' | 'grid3', event: Event): void {
    event.stopPropagation(); // Prevent event bubbling
    this.currentView = view;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode; // Example: Replace with actual theme toggle logic
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'am' : 'en'; // Example: Replace with actual language toggle logic
  }

  logout(): void {
    console.log('Logout clicked'); // Example: Replace with actual logout logic
  }
}