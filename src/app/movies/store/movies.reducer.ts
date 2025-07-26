import { createFeature, createReducer, on } from "@ngrx/store";
import * as MoviesActions from "./movies.actions";
import { Movie } from "../models/movie.model";

export interface MoviesPagination {
  page: number;
  total_pages?: number;
  total_results?: number;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  moviesPagination: MoviesPagination;
  loading: boolean;
  error: string | null;
}

export const initialState: MoviesState = {
  movies: [],
  moviesPagination: {
    page: 1,
    total_pages: 100,
    total_results: 5000
  },
  selectedMovie: null,
  loading: false,
  error: null,
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MoviesActions.loadMoviesSuccess, (state, { movies, pagination }) => ({
    ...state,
    moviesPagination: pagination,
    movies,
    loading: false,
    error: null,
  })),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MoviesActions.selectMovieSuccess, (state, { movie }) => ({
    ...state,
    loading: false,
    selectedMovie: movie,
  })),
  on(MoviesActions.selectMovie, (state) => ({
    ...state,
    loading: true,
  }))
);

export const moviesFeature = createFeature({ name: 'movies', reducer: moviesReducer });
