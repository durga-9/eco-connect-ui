import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    {
      provide: RouteReuseStrategy,
      useValue: {
        shouldDetach: () => false,
        store: () => {},
        shouldAttach: () => false,
        retrieve: () => null,
        shouldReuseRoute: () => false
      }
    }

  ]
};