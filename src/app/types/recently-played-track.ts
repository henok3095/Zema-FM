export interface RecentlyPlayedTrack {
    id: string;
    name: string;
    image: string;
    artist: string;
    album: string;
    albumImage: string;
    previewUrl: string | null;
    playedAt: string;
  }