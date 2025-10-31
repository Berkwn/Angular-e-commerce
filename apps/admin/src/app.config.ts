import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';


registerLocaleData(localeTr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
   provideZonelessChangeDetection(),
   provideHttpClient(),
    provideRouter(appRoutes),
    { provide: 'LOCALE_ID', useValue: 'tr' }
  ],
};
