import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { MoviesPagination } from './movies.reducer';

export const loadMovies = createAction(
  '[Movies] Load Movies',
  props<{ pagination: MoviesPagination }>()
);

export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  props<{ movies: Movie[]; pagination: MoviesPagination }>()
);

export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  props<{ error: string }>()
);

export const selectMovie = createAction(
  '[Movies] Select Movie',
  props<{ id: number }>()
);

export const selectMovieSuccess = createAction(
  '[Movies] Select Movie Success',
  props<{ movie: Movie }>()
);
