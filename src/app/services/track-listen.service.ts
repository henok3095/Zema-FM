// src/app/services/track-listen.service.ts
import { Injectable } from '@angular/core';
import { Track } from '../types/track'; // This should now resolve

interface ListenEvent {
  userId: string;
  trackId: string;
  durationListened: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TrackListenService {
  private listenEvents: ListenEvent[] = [];

  constructor() {
    const saved = localStorage.getItem('listenEvents');
    if (saved) {
      this.listenEvents = JSON.parse(saved).map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp),
      }));
    }
  }

  logListen(userId: string, track: Track, durationListened: number): void {
    if (durationListened >= 30) {
      const listenEvent: ListenEvent = {
        userId,
        trackId: track.id,
        durationListened,
        timestamp: new Date(),
      };
      this.listenEvents.push(listenEvent);
      this.save();
    }
  }

  getListenCount(trackId: string, userId?: string): number {
    return this.listenEvents.filter(event =>
      event.trackId === trackId && (!userId || event.userId === userId)
    ).length;
  }

  getUserListens(userId: string): ListenEvent[] {
    return this.listenEvents.filter(event => event.userId === userId);
  }

  private save(): void {
    localStorage.setItem('listenEvents', JSON.stringify(this.listenEvents));
  }
}