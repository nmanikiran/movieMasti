import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { MovieDBService } from 'app/services/movie-db.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  yearsList: Number[];
  sortByList: any;
  genresList: any;
  options: any;
  itemList: any;

  constructor(private titleService: Title, public DBService: MovieDBService) {
    this.DBService.getGenres().subscribe((res: any) => this.genresList = res.genres);
    this.options = {};
    this.getDiscover();
    this.titleService.setTitle('Discover Tv Shows');
  }

  ngOnInit() {
    this.yearsList = this.DBService.getYears();

    this.sortByList = [
      { key: 'popularity.desc', value: 'Popularity Descending' }, { key: 'popularity.asc', value: 'Popularity Ascending' },
      { key: 'vote_count.asc', value: 'Rating Ascending' }, { key: 'vote_count.desc', value: 'Rating Descending' },
      { key: 'primary_release_date.desc', value: 'Release Date Descending' },
      { key: 'primary_release_date.asc', value: 'Release Date Ascending' }
    ];
  }

  getDiscover() {
    this.DBService.getDiscover('tv', this.options).subscribe((res: any) => {
      const placeholderImg = 'http://via.placeholder.com/500x281?text=MovieMasti';
      this.itemList = res.results.map(item => {
        item.poster_path = item.poster_path ? `http://image.tmdb.org/t/p/w500/${item.poster_path}` : placeholderImg;
        item.backdrop_path = item.backdrop_path ? `http://image.tmdb.org/t/p/w500/${item.backdrop_path}` : placeholderImg;
        item.overview = item.overview.substr(0, 100) + '...';
        return item;
      });
    });
  }


}

