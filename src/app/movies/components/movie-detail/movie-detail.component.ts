import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Movie } from "../../models/movie.model";
import * as fromMovies from "../../store/movies.selectors";
import * as MoviesActions from '../../store/movies.actions';
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  standalone: true,
  styleUrls: ["./movie-detail.component.scss"],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("4000ms ease", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MovieDetailComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  movie$!: Observable<Movie | null>;
  loading$: Observable<boolean> = this.store.select(fromMovies.selectLoading);

  ngOnInit(): void {
    const savedSelected = this.store.selectSignal(fromMovies.selectSelectedMovie);
    if (!savedSelected()) {
      this.store.dispatch(MoviesActions.selectMovie({ id: this.activatedRoute.snapshot.params['id'] }));
    }
    this.movie$ = this.store.select(fromMovies.selectSelectedMovie);
  }

  back(): void {
    this.router.navigate(['movies']);
  }
}

