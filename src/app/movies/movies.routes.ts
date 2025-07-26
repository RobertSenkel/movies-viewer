import { Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movie-list/movie-list.component';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviesListComponent },
      { path: ':id', component: MovieDetailComponent }
    ]
  }
];
