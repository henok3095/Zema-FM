// src/app/services/streak.service.ts
import { Injectable } from '@angular/core';

interface ListeningStreak {
  userId: string;
  streakCount: number;
  lastListenedDate: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class StreakService {
  private streaks: Map<string, ListeningStreak> = new Map();

  constructor() {
    const saved = localStorage.getItem('streaks');
    if (saved) {
      // Define the type of parsed as a Record<string, ListeningStreak>
      const parsed: Record<string, ListeningStreak> = JSON.parse(saved);
      for (const [userId, streak] of Object.entries(parsed)) {
        this.streaks.set(userId, {
          ...streak,
          lastListenedDate: streak.lastListenedDate ? new Date(streak.lastListenedDate) : null,
        });
      }
    }
  }

  updateStreak(userId: string, listenDate: Date): void {
    const today = new Date(listenDate);
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const streak = this.streaks.get(userId) || { userId, streakCount: 0, lastListenedDate: null };

    const lastListened = streak.lastListenedDate ? new Date(streak.lastListenedDate) : null;
    if (lastListened) {
      lastListened.setHours(0, 0, 0, 0);
    }

    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (!lastListened || today.getTime() === lastListened.getTime()) {
      // Same day, no update to streak
    } else if (today.getTime() - lastListened.getTime() === oneDayInMs) {
      // Consecutive day, increment streak
      streak.streakCount++;
    } else {
      // Missed a day or first listen, reset streak
      streak.streakCount = 1;
    }

    streak.lastListenedDate = today;
    this.streaks.set(userId, streak);
    this.save();
  }

  getStreak(userId: string): number {
    const streak = this.streaks.get(userId);
    return streak ? streak.streakCount : 0;
  }

  private save(): void {
    const streaksObj = Object.fromEntries(this.streaks);
    localStorage.setItem('streaks', JSON.stringify(streaksObj));
  }
}