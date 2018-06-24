import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MovieDBService } from '../services/movie-db.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  itemList: any;
  defaultImage = environment.placeholderImg;
  constructor(
    private titleService: Title,
    public DBService: MovieDBService,
    private router: Router
  ) {
    this.getDiscover({});
    this.titleService.setTitle('Discover New Movies');
  }

  ngOnInit() {}

  getDiscover(options) {
    this.DBService.getDiscover('movie', options).subscribe((res: any) => {
      this.itemList = res;
    });
  }

  like(e, movie) {
    e.stopPropagation();
    alert(movie.title);
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
