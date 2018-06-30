import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieDBService } from '../../services/movie-db.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();
  options: any;
  yearsList: Number[];
  sortByList: any;
  genresList: any;

  constructor(public DBService: MovieDBService) {
    this.DBService.getGenres().subscribe(
      (res: any) => (this.genresList = res.genres)
    );
    this.options = {};
  }

  ngOnInit() {
    this.yearsList = this.DBService.getYears();
    this.sortByList = this.DBService.sortByList();
  }

  changeSelection() {
    this.filterChange.emit(this.options);
  }
}
