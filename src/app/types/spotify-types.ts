// src/app/types/spotify-types.ts
export interface SpotifyImage {
    url: string;
  }
  
  export interface SpotifyArtist {
    id: string;
    name: string;
    images?: SpotifyImage[];
    genres?: string[];
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    album: { name: string; images: SpotifyImage[] };
    artists: { name: string }[];
    preview_url?: string | null;
    duration_ms?: number; // Make optional to match Spotify API response
  }
  
  export interface SpotifyRecentlyPlayed {
    track: SpotifyTrack;
    played_at: string;
  }
  
  export interface SpotifyApiResponse<T> {
    items: T[];
  }
  
  export interface CurrentlyPlaying {
    item: SpotifyTrack;
    is_playing: boolean;
    progress_ms: number;
  }
  
  export interface SpotifyUserProfile {
    display_name: string;
    email: string;
    images: SpotifyImage[];
  }