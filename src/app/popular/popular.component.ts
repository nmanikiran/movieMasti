import { Component, HostListener, Inject, OnInit, VERSION } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { MovieDBService } from '../services/movie-db.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})

export class PopularComponent implements OnInit {

  movies: any[];

  constructor(
    private dbservice: MovieDBService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document) {
    console.log(VERSION);
  }

  ngOnInit() {
    this.getMovies('popular');
  }

  @HostListener('scroll', ['$event']) onWindowScroll(event: Event): void {
    console.log('scrolled');
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
