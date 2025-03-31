export interface Track {
  id: string;
  name: string;
  image: string;
  artist: string; // This is a string, not an array
  album: string;
  albumImage: string;
  previewUrl: string | null;
}