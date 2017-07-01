import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDBService } from '../services/movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: string;
  movie: any;
  index: number;

  constructor(private route: ActivatedRoute, private dbService: MovieDBService) {
    this.movieId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMovieDetails(this.movieId);
  }

  getMovieDetails(id) {
    this.dbService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      console.log(res);
      this.movie.poster_path = `http://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
      this.movie.backdrop_path = `http://image.tmdb.org/t/p/original/${this.movie.backdrop_path}`;
    });
  }

  getMovieVideos(): void {
    if (this.movie.videos && this.movie.videos.length) { return };

    this.dbService.getMovieVideos(this.movieId).subscribe((res: any) => {
      this.movie.videos = res.results.map(video => {
        video.imgUrl = `https://img.youtube.com/vi/${video.key}/0.jpg`;
        video.url = `https://www.youtube.com/watch?v=${video.key}`;
        return video;
      });
    })
  }

  getMovieReviews(): void {
    if (this.movie.reviews && this.movie.reviews.length) { return };

    this.dbService.getMovieReviews(this.movieId).subscribe((res: any) => {
      this.movie.reviews = res.results || [];
    })
  }

  selectChange() {
    if (this.index === 1) {
      this.getMovieVideos();
    } else if (this.index === 2) {
      this.getMovieReviews();
    }
  }

}
