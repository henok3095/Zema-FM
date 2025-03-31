import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translations } from '../../interfaces/translations.interface';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.css'],
})
export class NoResultsComponent {
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key in 'en' | 'am']: Translations } = {
    en: {
      topArtists: 'Top Artists',
      topTracks: 'Top Tracks',
      topAlbums: 'Top Albums',
      recentlyPlayed: 'Recently Played',
      topGenres: 'Top Genres',
      favoriteTracks: 'Favorite Tracks',
      showMoreStats: 'Show More Stats',
      hideMoreStats: 'Hide More Stats',
      listeningStreak: 'Listening Streak',
      days: 'Days',
      shortTerm: 'Short Term',
      mediumTerm: 'Medium Term',
      longTerm: 'Long Term',
      nowPlaying: 'Now Playing',
      logout: 'Logout',
      toggleLanguage: 'Switch to Amharic',
      toggleTheme: 'Switch to',
      noResults: 'No Results',
      showMore: 'Show More',
      showLess: 'Show Less',
      seeMore: 'See More'
    },
    am: {
      topArtists: 'ከፍተኛ አርቲስቶች',
      topTracks: 'ከፍተኛ ትራኮች',
      topAlbums: 'ከፍተኛ አልበሞች',
      recentlyPlayed: 'በቅርቡ የተጫወቱ',
      topGenres: 'ከፍተኛ ዘፈኖች',
      favoriteTracks: 'የመወያየር ትራኮች',
      showMoreStats: 'ተጨማሪ ስታትስ አሳይ',
      hideMoreStats: 'ተጨማሪ ስታትስ ደብቅ',
      listeningStreak: 'ተከታታይ ማዳመጥ',
      days: 'ቀናት',
      shortTerm: 'አጭር ጊዜ',
      mediumTerm: 'መካከለኛ ጊዜ',
      longTerm: 'ረጅም ጊዜ',
      nowPlaying: 'አሁን እየተጫወተ ነው',
      logout: 'ውጣ',
      toggleLanguage: 'Switch to English',
      toggleTheme: 'ቀይር ወደ',
      noResults: 'የምስራች የምስራች',
      showMore: 'የምስራች የምስራች',
      showLess: 'የምስራች የምስራች',
      seeMore: 'የምስራች የምስራች'
    }
  };
  @Input() currentLanguage: 'en' | 'am' = 'en';
}