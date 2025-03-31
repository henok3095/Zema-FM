import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Artist {
  name: string;
  image: string;
  genres: string[];
}

interface Translations {
seeMore: any;
  topArtists: string;
}

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css'],
})
export class TopArtistsComponent {
  @Input() filteredArtists: Artist[] = [];
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key: string]: Translations } = { en: { topArtists: 'Top Artists' }, am: { topArtists: 'ከፍተኛ አርቲስቶች' } };
  @Input() currentLanguage: 'en' | 'am' = 'en';
topArtists: any;
visibleArtists: any;
}