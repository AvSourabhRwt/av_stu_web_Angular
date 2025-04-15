// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { routes } from './app.routes';
// import { BaseRepository } from './services/base.repository';
// import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//      provideRouter(routes),provideHttpClient(),
//      importProvidersFrom(JwtHelperService),
//      provideHttpClient(),
//      BaseRepository]
// };

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common'; // 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Required for HTTP requests
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(CommonModule), // Ensure Router is provided
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: {} } // Required dependency
  ]
};

