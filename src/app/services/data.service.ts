// src/app/services/data.service.ts (example)
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../types/artist';
import { Track } from '../types/track';
import { Album } from '../types/album';
import { RecentlyPlayedTrack } from '../types/recently-played-track';
import { FavoriteTrack } from '../types/favorite-track';
import { Translations } from '../interfaces/translations.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private topArtistsSubject = new BehaviorSubject<Artist[]>([]);
  private topTracksSubject = new BehaviorSubject<Track[]>([]);
  private topAlbumsSubject = new BehaviorSubject<Album[]>([]);
  private topGenresSubject = new BehaviorSubject<string[]>([]);
  private recentlyPlayedSubject = new BehaviorSubject<RecentlyPlayedTrack[]>([]);
  private favoriteTracksSubject = new BehaviorSubject<FavoriteTrack[]>([]); // Initialize with empty array
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  private translationsSubject = new BehaviorSubject<{ en: Translations; am: Translations }>({
    en: {
      topArtists: '',
      topTracks: '',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: '',
      mediumTerm: '',
      longTerm: '',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: '',
      showMore: '',
      showLess: '',
      seeMore: ''
    },
    am: {
      topArtists: '',
      topTracks: '',
      topAlbums: '',
      recentlyPlayed: '',
      topGenres: '',
      favoriteTracks: '',
      showMoreStats: '',
      hideMoreStats: '',
      listeningStreak: '',
      days: '',
      shortTerm: '',
      mediumTerm: '',
      longTerm: '',
      nowPlaying: '',
      logout: '',
      toggleLanguage: '',
      toggleTheme: '',
      noResults: '',
      showMore: '',
      showLess: '',
      seeMore: ''
    }
  });
  private currentLanguageSubject = new BehaviorSubject<'en' | 'am'>('en');

  topArtists$: Observable<Artist[]> = this.topArtistsSubject.asObservable();
  topTracks$: Observable<Track[]> = this.topTracksSubject.asObservable();
  topAlbums$: Observable<Album[]> = this.topAlbumsSubject.asObservable();
  topGenres$: Observable<string[]> = this.topGenresSubject.asObservable();
  recentlyPlayed$: Observable<RecentlyPlayedTrack[]> = this.recentlyPlayedSubject.asObservable();
  favoriteTracks$: Observable<FavoriteTrack[]> = this.favoriteTracksSubject.asObservable();
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();
  translations$: Observable<{ en: Translations; am: Translations }> = this.translationsSubject.asObservable();
  currentLanguage$: Observable<'en' | 'am'> = this.currentLanguageSubject.asObservable();

  constructor() {
    console.log('DataService: Constructor called');
    // Initialize favoriteTracks with an empty array to ensure it emits a value
    this.favoriteTracksSubject.next([]);
  }

  setTopArtists(artists: Artist[]) {
    console.log('DataService: setTopArtists called with:', artists);
    this.topArtistsSubject.next(artists);
  }

  setTopTracks(tracks: Track[]) {
    console.log('DataService: setTopTracks called with:', tracks);
    this.topTracksSubject.next(tracks);
  }

  setTopAlbums(albums: Album[]) {
    console.log('DataService: setTopAlbums called with:', albums);
    this.topAlbumsSubject.next(albums);
  }

  setTopGenres(genres: string[]) {
    console.log('DataService: setTopGenres called with:', genres);
    this.topGenresSubject.next(genres);
  }

  setRecentlyPlayed(recentlyPlayed: RecentlyPlayedTrack[]) {
    console.log('DataService: setRecentlyPlayed called with:', recentlyPlayed);
    this.recentlyPlayedSubject.next(recentlyPlayed);
  }

  setFavoriteTracks(favoriteTracks: FavoriteTrack[]) {
    console.log('DataService: setFavoriteTracks called with:', favoriteTracks);
    this.favoriteTracksSubject.next(favoriteTracks);
  }

  setIsDarkMode(isDarkMode: boolean) {
    console.log('DataService: setIsDarkMode called with:', isDarkMode);
    this.isDarkModeSubject.next(isDarkMode);
  }

  setTranslations(translations: { en: Translations; am: Translations }) {
    console.log('DataService: setTranslations called with:', translations);
    this.translationsSubject.next(translations);
  }

  setCurrentLanguage(language: 'en' | 'am') {
    console.log('DataService: setCurrentLanguage called with:', language);
    this.currentLanguageSubject.next(language);
  }
}