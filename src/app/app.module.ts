import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from './commons/common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverComponent } from './discover/discover.component';
import {
  MovieDetailsComponent, TrailerDialogComponent
} from './movie-details/movie-details.component';
import { PopularComponent } from './popular/popular.component';
import { MovieDBService } from './services/movie-db.service';
import { TopRatedComponent } from './top-rated/top-rated.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    TopRatedComponent,
    MovieDetailsComponent,
    TrailerDialogComponent,
    DiscoverComponent
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
