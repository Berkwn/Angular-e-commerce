import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { endpointInterceptor } from './endpoint-interceptor';


registerLocaleData(localeTr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
   provideZonelessChangeDetection(),
   provideHttpClient(withInterceptors([endpointInterceptor])),
    provideRouter(appRoutes),
    { provide: 'LOCALE_ID', useValue: 'tr' }
  ],
};
