import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoviesState } from "./movies.reducer";

export const selectMoviesState = createFeatureSelector<MoviesState>("movies");

export const selectMoviesPagination = createSelector(
  selectMoviesState,
  (state) => state.moviesPagination
);

export const selectAllMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);

export const selectSelectedMovie = createSelector(
  selectMoviesState,
  (state) => state.selectedMovie
);

export const selectLoading = createSelector(
  selectMoviesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMoviesState,
  (state) => state.error
);
