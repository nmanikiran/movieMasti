import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from './commons/common.module';
import {
    MovieDetailsComponent, TrailerDialogComponent
} from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDBService } from './services/movie-db.service';
import { TvShowsComponent } from './tv-shows/tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    TrailerDialogComponent,
    TvShowsComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [MovieDBService],
  bootstrap: [AppComponent],
  entryComponents: [TrailerDialogComponent]
})
export class AppModule { }
