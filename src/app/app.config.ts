import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error Handler (app.config.ts):', error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ]
};