// src/app/pages/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('LoginComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('LoginComponent: ngOnInit triggered');
    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark';
    console.log('LoginComponent: Theme applied:', this.isDarkMode);
  }

  loginWithSpotify(): void {
    console.log('LoginComponent: loginWithSpotify triggered');
    this.authService.login();
  }
}