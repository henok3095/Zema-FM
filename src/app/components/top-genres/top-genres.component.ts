// src/app/components/top-genres/top-genres.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Translations {
  topGenres: string;
}

@Component({
  selector: 'app-top-genres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-genres.component.html',
  styleUrls: ['./top-genres.component.css'],
})
export class TopGenresComponent {
  @Input() filteredGenres: string[] = [];
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key in 'en' | 'am']: Translations } = {
    en: { topGenres: 'Top Genres' },
    am: { topGenres: 'ከፍተኛ ዘፈኖች' },
  };
  @Input() currentLanguage: 'en' | 'am' = 'en';

  initialVisibleCount = 10;
  visibleCount = 10;
  increment = 10;

  ngOnInit(): void {
    this.visibleCount = this.initialVisibleCount;
  }

  ngOnChanges(): void {
    this.visibleCount = this.initialVisibleCount;
  }

  get visibleGenres(): string[] {
    return this.filteredGenres.slice(0, this.visibleCount);
  }

  showMore(): void {
    this.visibleCount += this.increment;
    if (this.visibleCount > this.filteredGenres.length) {
      this.visibleCount = this.filteredGenres.length;
    }
  }

  showLess(): void {
    this.visibleCount -= this.increment;
    if (this.visibleCount < this.initialVisibleCount) {
      this.visibleCount = this.initialVisibleCount;
    }
  }
}