import { initialState, moviesReducer } from './movies.reducer';
import * as MoviesActions from './movies.actions';
import { Movie } from '../models/movie.model';

describe('Movies Reducer', () => {
  const mockMovies: Movie[] = [
    { id: 1, title: 'Movie 1', release_date: '2024-01-01', overview: 'Desc', poster_path: '' },
    { id: 2, title: 'Movie 2', release_date: '2024-02-01', overview: 'Desc 2', poster_path: '' }
  ];

  const mockPagination = {
    page: 2,
    total_pages: 50,
    total_results: 1000,
  };

  it('should return the initial state', () => {
    const state = moviesReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toEqual(initialState);
  });

  it('should handle loadMovies action', () => {
    const state = moviesReducer(initialState, MoviesActions.loadMovies({ pagination: { page: 1 } }));
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should handle loadMoviesSuccess action', () => {
    const action = MoviesActions.loadMoviesSuccess({
      movies: mockMovies,
      pagination: mockPagination,
    });

    const state = moviesReducer(initialState, action);
    expect(state.movies).toEqual(mockMovies);
    expect(state.moviesPagination).toEqual(mockPagination);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should handle loadMoviesFailure action', () => {
    const errorMsg = 'Failed to fetch movies';
    const action = MoviesActions.loadMoviesFailure({ error: errorMsg });

    const state = moviesReducer(initialState, action);
    expect(state.loading).toBeFalse();
    expect(state.error).toBe(errorMsg);
  });

  it('should handle selectMovie action', () => {
    const action = MoviesActions.selectMovie({ id: 1 });

    const state = moviesReducer(initialState, action);
    expect(state.loading).toBeTrue();
  });

  it('should handle selectMovieSuccess action', () => {
    const movie = mockMovies[0];
    const action = MoviesActions.selectMovieSuccess({ movie });

    const state = moviesReducer(initialState, action);
    expect(state.selectedMovie).toEqual(movie);
    expect(state.loading).toBeFalse();
  });
});
