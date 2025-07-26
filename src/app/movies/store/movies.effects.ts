import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesService } from '../services/movies.service';
import * as MoviesActions from './movies.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoviesRest } from '../models/movies-res.model';
import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private moviesService = inject(MoviesService);
  private snackBar = inject(MatSnackBar);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap((p) =>
        this.moviesService.getPopularMovies(p.pagination.page).pipe(
          map((moviesRest: MoviesRest) =>
            MoviesActions.loadMoviesSuccess({
              movies: moviesRest.results,
              pagination: {
                page: moviesRest.page,
                total_pages: moviesRest.total_pages,
                total_results: moviesRest.total_results,
              },
            })
          ),
          catchError((error) =>
            of(
              MoviesActions.loadMoviesFailure({
                error: error.message || 'Failed to load movies',
              })
            )
          )
        )
      )
    )
  );

  loadMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.selectMovie),
      mergeMap((p) =>
        this.moviesService.getMovieById(p.id).pipe(
          map((movie: Movie) =>
            MoviesActions.selectMovieSuccess({ movie })
          ),
          catchError((error) =>
            of(
              MoviesActions.loadMoviesFailure({
                error: error.message || 'Failed to load movie',
              })
            )
          )
        )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MoviesActions.loadMoviesFailure),
        tap((action) => {
          this.snackBar.open(action.error, 'Close', { duration: 3000 });
        })
      ),
    { dispatch: false }
  );
}
