import { Component, OnInit, VERSION } from '@angular/core';
import { MovieDBService } from './services/movie-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = `MovieMasti`;
  themeName = 'indigo';
  colors = [
    { color: 'purple' },
    { color: 'orange' },
    { color: 'lightgreen' },
    { color: 'pink' }
  ];
  constructor() {}
  changeTheme(color) {
    this.themeName = color;
  }

  ngOnInit() {}
}
