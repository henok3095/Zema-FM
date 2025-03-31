// src/app/components/time-range/time-range.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.css'],
})
export class TimeRangeComponent {
  @Input() timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
  @Input() translations: { [key: string]: any } = {};
  @Input() currentLanguage: 'en' | 'am' = 'en';
  @Input() isDarkMode: boolean = false; // Input for dark mode
  @Output() timeRangeChange = new EventEmitter<'short_term' | 'medium_term' | 'long_term'>();

  timeRanges: ('short_term' | 'medium_term' | 'long_term')[] = ['short_term', 'medium_term', 'long_term'];

  onTimeRangeChange(range: 'short_term' | 'medium_term' | 'long_term') {
    this.timeRange = range; // Update the time range
    this.timeRangeChange.emit(range);
    console.log('Time range changed to:', this.timeRange); // Debug log
  }
}