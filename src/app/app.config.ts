import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MoviesEffects } from './movies/store/movies.effects';
import { moviesFeature } from './movies/store/movies.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideStore({}),
    provideEffects(MoviesEffects),
    provideState(moviesFeature),
    provideHttpClient(),
    provideAnimations()
  ]
};
