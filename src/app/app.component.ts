import { Component, OnInit, VERSION } from '@angular/core';
import { MovieDBService } from './services/movie-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = `MovieMasti`;

  constructor() {}

  ngOnInit() {}
}
