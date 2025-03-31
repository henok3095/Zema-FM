// src/app/components/footer/footer.component.ts
import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements AfterViewInit {
  @Input() isDarkMode: boolean = false;
  @Input() translations: { [key: string]: any } = {};
  @Input() currentLanguage: 'en' | 'am' = 'en';

  ngAfterViewInit() {
    // Optional: Initialize Vanilla Tilt if you choose to use the library
    // if (typeof (window as any).VanillaTilt !== 'undefined') {
    //   (window as any).VanillaTilt.init(document.querySelector('.tilt-content'), {
    //     max: 10,
    //     speed: 400,
    //     perspective: 1000,
    //     glare: true,
    //     'max-glare': 0.3,
    //   });
    // }
  }
}