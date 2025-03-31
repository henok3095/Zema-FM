import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: Track[] = [];

  constructor() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  getFavorites(): Track[] {
    return this.favorites;
  }

  addFavorite(track: Track): void {
    if (!this.isFavorite(track)) {
      this.favorites.push(track);
      this.save();
    }
  }

  removeFavorite(track: Track): void {
    this.favorites = this.favorites.filter((t) => t.id !== track.id);
    this.save();
  }

  isFavorite(track: Track): boolean {
    return this.favorites.some((t) => t.id === track.id);
  }

  private save(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}

interface Track {
  id: string;
  name: string;
  image: string;
  artist: string;
}