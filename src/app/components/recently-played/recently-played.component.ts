// src/app/components/recently-played/recently-played.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { RecentlyPlayedTrack } from '../../types/recently-played-track';

@Component({
  selector: 'app-recently-played',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.css'],
})
export class RecentlyPlayedComponent {
  @Input() recentlyPlayed: RecentlyPlayedTrack[] = [];
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key: string]: any } = {};
  @Input() currentLanguage: 'en' | 'am' = 'en';

  initialVisibleCount = 10;

  get visibleTracks(): RecentlyPlayedTrack[] {
    return this.recentlyPlayed.slice(0, this.initialVisibleCount);
  }

  formatPlayedAt(playedAt: string): string {
    const date = new Date(playedAt);
    return date.toLocaleString(this.currentLanguage === 'en' ? 'en-US' : 'am-ET', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}