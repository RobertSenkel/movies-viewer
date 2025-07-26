import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import * as MoviesActions from '../../store/movies.actions';
import * as fromMovies from '../../store/movies.selectors';
import { MoviesPagination } from '../../store/movies.reducer';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatPaginatorModule],
})
export class MoviesListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  movies$: Observable<Movie[]> = this.store.select(fromMovies.selectAllMovies);
  loading$: Observable<boolean> = this.store.select(fromMovies.selectLoading);
  pagination$: Observable<MoviesPagination | null> = this.store.select(fromMovies.selectMoviesPagination);

  ngOnInit(): void {
    const initialPagination = this.store.selectSignal(fromMovies.selectMoviesPagination);
    this.store.dispatch(MoviesActions.loadMovies({ pagination: initialPagination() }));
  }

  handlePageEvent(e: PageEvent): void {
    this.store.dispatch(MoviesActions.loadMovies({ pagination: { page: e.pageIndex + 1 } }));
  }

  onSelect(movie: Movie): void {
    this.store.dispatch(MoviesActions.selectMovie({ id: movie.id }));
    this.router.navigate(['movies', movie.id]);
  }
}
