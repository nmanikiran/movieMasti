import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { MovieDBService } from '../services/movie-db.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  yearsList: Number[];
  sortByList: any;
  genresList: any;
  options: any;
  itemList: any;

  constructor(private titleService: Title,
    public DBService: MovieDBService,
    private router: Router, ) {
    this.DBService.getGenres().subscribe((res: any) => this.genresList = res.genres);
    this.options = {};
    this.getDiscover();
    this.titleService.setTitle('Discover New Movies');
  }

  ngOnInit() {
    this.yearsList = this.DBService.getYears();

    this.sortByList = [
      { key: 'popularity.desc', value: 'Popularity Descending' },
      { key: 'popularity.asc', value: 'Popularity Ascending' },
      { key: 'vote_count.asc', value: 'Rating Ascending' },
      { key: 'vote_count.desc', value: 'Rating Descending' },
      { key: 'primary_release_date.desc', value: 'Release Date Descending' },
      { key: 'primary_release_date.asc', value: 'Release Date Ascending' }
    ];
  }

  getDiscover() {
    this.DBService.getDiscover('movie', this.options).subscribe((res: any) => {
      const placeholderImg = 'http://via.placeholder.com/500x281?text=MovieMasti';
      const imgUrl = `http://image.tmdb.org/t/p/w500`;
      this.itemList = res.results.map(item => {
        item.poster_path = item.poster_path ? `${imgUrl}/${item.poster_path}` : placeholderImg;
        item.backdrop_path = item.backdrop_path ? `${imgUrl}/${item.backdrop_path}` : placeholderImg;
        item.overview = item.overview.substr(0, 100) + '...';
        return item;
      });
    });
  }

  like(e, movie) {
    e.stopPropagation();
    alert(movie.title)
  }
  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }


}








// { key: 'revenue.asc', value: '' }, { key: 'revenue.desc', value: '' },
//       { key: 'release_date.asc', value: '' }, { key: 'release_date.desc', value: '' },
//       { key: 'original_title.asc', value: '' }, { key: 'original_title.desc', value: '' },
//       { key: 'vote_average.asc', value: '' }, { key: 'vote_average.desc', value: '' }
