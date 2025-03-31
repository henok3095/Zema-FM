// src/app/components/user-profile/user-profile.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  image: string;
  // Removed isOnline since it's no longer used
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() user: User | null = null;
  @Input() isDarkMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // No subscription needed anymore
  }

  ngOnDestroy() {
    // No subscription to clean up
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/avatar.svg'; // Fallback image
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }
}