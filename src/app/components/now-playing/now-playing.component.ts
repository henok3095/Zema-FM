// src/app/components/now-playing/now-playing.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { DataService } from '../../services/data.service';
import { Track } from '../../types/track';
import { interval, Subscription, Observable } from 'rxjs';
import { CurrentlyPlaying } from '../../types/spotify-types';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css'],
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key: string]: any } = {};
  @Input() currentLanguage: 'en' | 'am' = 'en';
  currentTrack: Track | null = null;
  progressMs: number = 0;
  durationMs: number = 0;
  progressPercentage: number = 0;
  private pollingSubscription: Subscription | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.dataService.translations$.subscribe((translations) => {
      this.translations = translations;
    });
    this.dataService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });

    this.fetchCurrentlyPlaying();

    // Poll every 10 seconds to update the currently playing track
    this.pollingSubscription = interval(10000).subscribe(() => {
      this.fetchCurrentlyPlaying();
    });
  }

  fetchCurrentlyPlaying(): void {
    this.spotifyService.getCurrentlyPlaying().subscribe({
      next: (data: CurrentlyPlaying | null) => {
        if (data && data.item) {
          this.currentTrack = {
            id: data.item.id,
            name: data.item.name,
            image: data.item.album.images[0]?.url || 'https://via.placeholder.com/150',
            artist: data.item.artists[0]?.name || 'Unknown Artist',
            album: data.item.album.name,
            albumImage: data.item.album.images[0]?.url || 'https://via.placeholder.com/150',
            previewUrl: data.item.preview_url || null,
          };
          this.progressMs = data.progress_ms;
          this.durationMs = data.item.duration_ms || 1; // Avoid division by zero
          this.updateProgress();
        } else {
          this.currentTrack = null;
          this.progressMs = 0;
          this.durationMs = 0;
          this.progressPercentage = 0;
        }
      },
      error: (err: any) => {
        console.error('Error fetching currently playing track:', err);
        this.currentTrack = null;
        this.progressMs = 0;
        this.durationMs = 0;
        this.progressPercentage = 0;
      },
    });
  }

  updateProgress(): void {
    if (this.durationMs > 0) {
      this.progressPercentage = (this.progressMs / this.durationMs) * 100;
    }
  }

  formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getCurrentlyPlaying(): Observable<CurrentlyPlaying | null> {
    return this.spotifyService.getCurrentlyPlaying();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}