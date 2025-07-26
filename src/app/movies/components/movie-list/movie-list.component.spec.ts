import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { MoviesListComponent } from './movie-list.component';
import * as MoviesActions from '../../store/movies.actions';
import * as fromMovies from '../../store/movies.selectors';
import { Movie } from '../../models/movie.model';
import { PageEvent } from '@angular/material/paginator';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let store: MockStore;

  const mockMovies: Movie[] = [
    { id: 1, title: 'Movie 1', release_date: '2023-01-01', poster_path: '', overview: '' },
    { id: 2, title: 'Movie 2', release_date: '2023-02-01', poster_path: '', overview: '' }
  ];

  const mockPagination = { page: 1, totalPages: 10, totalResults: 100 };

  const initialState = {
    movies: {
      movies: mockMovies,
      loading: false,
      pagination: mockPagination
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
        provideRouter([])
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(fromMovies.selectAllMovies, mockMovies);
    store.overrideSelector(fromMovies.selectLoading, false);
    store.overrideSelector(fromMovies.selectMoviesPagination, mockPagination);

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMovies on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovies({ pagination: mockPagination }));
  });

  it('should dispatch loadMovies with new page on paginator event', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const event: PageEvent = { pageIndex: 2, pageSize: 10, length: 100 };
    component.handlePageEvent(event);
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovies({ pagination: { page: 3 } }));
  });

  it('should navigate and dispatch selectMovie on select', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const navigateSpy = spyOn(component['router'], 'navigate');
    const movie: Movie = mockMovies[0];

    component.onSelect(movie);

    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.selectMovie({ id: movie.id }));
    expect(navigateSpy).toHaveBeenCalledWith(['movies', movie.id]);
  });
});
