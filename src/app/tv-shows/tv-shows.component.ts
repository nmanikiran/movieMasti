import { MovieDBService } from 'app/services/movie-db.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  itemList: any;
  defaultImage = environment.placeholderImg;
  options = { page: 1 };
  pager = { currentPage: 1, totalPages: 0 };
  isLoading = false;
  constructor(private titleService: Title, public DBService: MovieDBService) {
    this.getDiscover(this.options);
    this.titleService.setTitle('Discover Tv Shows');
  }

  ngOnInit() {}

  getDiscover(options) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.DBService.getDiscover('tv', options).subscribe(
      (res: any) => {
        this.pager.totalPages = res.total_pages;
        this.isLoading = false;
        this.itemList = this.DBService.formatMovies(res.results);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 1000);
      },
      (error) => {
        this.isLoading = false;
      },
    );
  }

  changeSelection(options) {
    this.pager.currentPage = 1;
    options.page = 1;
    this.getDiscover(options);
  }

  changePage(pageno) {
    this.pager.currentPage = pageno;
    this.options.page = pageno;
    this.getDiscover(this.options);
  }
}
