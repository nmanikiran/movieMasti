import { MovieDBService } from 'app/services/movie-db.service';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  itemList: any;

  constructor(private titleService: Title, public DBService: MovieDBService) {
    this.getDiscover({});
    this.titleService.setTitle('Discover Tv Shows');
  }

  ngOnInit() {}

  getDiscover(options) {
    this.DBService.getDiscover('tv', options).subscribe((res: any) => {
      this.itemList = res;
    });
  }
}
