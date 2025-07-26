import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { MoviesRest } from "../models/movies-res.model";
import { Movie } from "../models/movie.model";

@Injectable({ providedIn: "root" })
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number): Observable<MoviesRest> {
    const url = `${this.apiUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=en-US&page=${page}`;
    return this.http.get<any>(url);
  }

  getMovieById(id: number): Observable<Movie> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=en-US`;
    return this.http.get<Movie>(url);
  }
}
