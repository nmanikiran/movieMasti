import { Component, OnInit } from '@angular/core';
import { MovieDBService } from '../services/movie-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {

  movies: any[];

  constructor(private dbservice: MovieDBService, private router: Router) { }

  ngOnInit() {
    this.getMovies('top_rated');
  }

  getMovies(type) {
    this.dbservice.getMovies(type).subscribe((res: any) => {
      this.movies = res.results.map(movie => {
        movie.poster_path = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movie.backdrop_path = `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
        movie.overview = movie.overview.substr(0, 100) + '...';
        return movie;
      });
    });
  }

   goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

}
