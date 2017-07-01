import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularComponent } from './popular/popular.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DiscoverComponent } from 'app/discover/discover.component';

const routes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'popular', component: PopularComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'top-rated', component: TopRatedComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

