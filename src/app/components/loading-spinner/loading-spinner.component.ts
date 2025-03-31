import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input() isDarkMode: boolean = false;
  @Input() isLoading: boolean = true;
  showSpinner: boolean = false;
  private minDisplayTime: number = 1000; // Minimum display time in milliseconds (1 second)
  private timer: any;

  ngOnInit() {
    if (this.isLoading) {
      this.startSpinner();
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private startSpinner() {
    this.showSpinner = true;
    this.timer = setTimeout(() => {
      this.checkSpinnerState();
    }, this.minDisplayTime);
  }

  private checkSpinnerState() {
    if (!this.isLoading) {
      this.showSpinner = false;
    }
  }

  ngOnChanges() {
    if (this.isLoading && !this.showSpinner) {
      this.startSpinner();
    } else if (!this.isLoading) {
      this.checkSpinnerState();
    }
  }
}