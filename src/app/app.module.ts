import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from './commons/common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MovieDetailsComponent, TrailerDialogComponent
} from './movie-details/movie-details.component';
import { MovieDBService } from './services/movie-db.service';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { ReactionComponent } from './commons/components/reaction.component'

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    TrailerDialogComponent,
    TvShowsComponent,
    MoviesComponent,
    ReactionComponent
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
