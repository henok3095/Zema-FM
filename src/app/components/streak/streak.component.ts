// src/app/components/streak/streak.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

interface Translations {
  artistDominance: string;
  topArtistsByTrackCount: string; // New translation for the subtitle
}

interface ArtistCount {
  name: string;
  count: number;
  displayCount: number; // For the counting animation
}

@Component({
  selector: 'app-streak',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.css'],
})
export class StreakComponent implements OnInit, OnDestroy {
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key: string]: Translations } = {
    en: { 
      artistDominance: 'Artist Dominance',
      topArtistsByTrackCount: 'Top Artists by Track Count' // Added subtitle
    },
    am: { 
      artistDominance: 'አርቲስት የበላኝነት',
      topArtistsByTrackCount: 'በትራክ ብዛት ከፍተኛ አርቲስቶች' // Amharic translation for subtitle
    },
  };

  currentLanguage: 'en' | 'am' = 'en'; // Ensure this matches the desired language
  @Input() userId: string = '';

  artistList: ArtistCount[] = [];
  private subscription: Subscription | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Subscribe to topTracks$ to calculate artist counts
    this.subscription = this.dataService.topTracks$.subscribe(tracks => {
      if (tracks && tracks.length > 0) {
        // Calculate the count for each artist
        const artistCounts: { [key: string]: number } = {};

        tracks.forEach(track => {
          const artistName = track.artist || 'Unknown Artist';
          artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
        });

        // Convert to a list of ArtistCount objects and sort by count (descending)
        this.artistList = Object.entries(artistCounts)
          .map(([name, count]) => ({ name, count, displayCount: 0 }))
          .sort((a, b) => b.count - a.count);

        // Start the counting animation for each artist
        this.artistList.forEach(artist => this.animateCount(artist));
      } else {
        this.artistList = [];
      }
    });
  }

  // Custom counting animation for each artist
  private animateCount(artist: ArtistCount): void {
    const duration = 2000; // 2 seconds
    const steps = 60; // Number of steps for smooth animation
    const increment = artist.count / steps;
    let currentCount = 0;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      currentCount += increment;
      artist.displayCount = Math.round(currentCount);

      if (artist.displayCount >= artist.count) {
        artist.displayCount = artist.count; // Ensure we don't overshoot
        clearInterval(interval);
      }
    }, intervalTime);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}