import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularComponent } from './popular/popular.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: PopularComponent },
  { path: 'popular', component: PopularComponent },
  { path: 'top-rated', component: TopRatedComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
