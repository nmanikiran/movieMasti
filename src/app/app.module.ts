import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MovieDBService } from './services/movie-db.service';
import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { MovieDetailsComponent, TrailerDialogComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    TopRatedComponent,
    MovieDetailsComponent,
    TrailerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [MovieDBService],
  bootstrap: [AppComponent],
  entryComponents: [TrailerDialogComponent]
})
export class AppModule { }
