// src/app/types/favorite-track.ts
export interface FavoriteTrack {
  id: string;
  name: string;
  image: string;
  artist: string;
  playCount?: number; // Optional, as it might not always be available
}