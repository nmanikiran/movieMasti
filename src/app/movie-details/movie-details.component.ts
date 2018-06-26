import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { MovieDBService } from '../services/movie-db.service';
import { SocialShareComponent } from './../shared/social-share/social-share.component';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string;
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private dbService: MovieDBService,
    public dialog: MatDialog,
    public domSanitizer: DomSanitizer,
    private titleService: Title,
    private location: Location,
    private router: Router
  ) {
    this.domSanitizer = domSanitizer;
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
    });
  }

  ngOnInit() {}

  getMovieDetails(id) {
    this.dbService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.getCast();
      this.titleService.setTitle(res.title);
      this.movie.poster_path = `${environment.imgUrl}${this.movie.poster_path}`;
      this.movie.backdrop_path = `https://image.tmdb.org/t/p/original${
        this.movie.backdrop_path
      }`;
    });
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  getCast() {
    this.dbService.getCastMovie(this.movieId).subscribe(res => {
      this.movie.cast = res['cast'].slice(0, 10).map(cast => {
        cast.imgUrl = `${environment.imgUrl}${cast.profile_path}`;
        return cast;
      });
    });
  }

  getMovieVideos(): void {
    if (this.movie.videos && this.movie.videos.length) {
      return;
    }

    this.dbService.getMovieVideos(this.movieId).subscribe((res: any) => {
      this.movie.videos = res.results.map(video => {
        video.imgUrl = `https://img.youtube.com/vi/${video.key}/0.jpg`;
        video.url = `https://www.youtube.com/watch?v=${video.key}`;
        return video;
      });
    });
  }

  getMovieReviews(): void {
    if (this.movie.reviews && this.movie.reviews.length) {
      return;
    }

    this.dbService.getMovieReviews(this.movieId).subscribe((res: any) => {
      this.movie.reviews = res.results || [];
    });
  }

  similarMovies(): any {
    if (this.movie.similarMovies && this.movie.similarMovies.length) {
      return;
    }
    if (this.movieId) {
      this.dbService.getSimilarMovies(this.movieId).subscribe((res: any) => {
        this.movie.similarMovies = this.dbService.formatMovies(res.results);
      });
    }
  }

  selectChange(event: number) {
    if (event === 1) {
      this.getMovieVideos();
    } else if (event === 2) {
      this.getMovieReviews();
    } else if (event === 3) {
      this.similarMovies();
    }
  }

  openDialog(video) {
    const videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.key}?autoplay=1`
    );
    const dialogRef = this.dialog.open(TrailerDialogComponent, {
      data: { videoUrl: videoUrl }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openShare(video) {
    const width = window.innerWidth > 720 ? '50%' : '90%';
    const dialogRef = this.dialog.open(SocialShareComponent, {
      data: { movie: this.movie },
      width: width,
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  back() {
    this.location.back();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'trailer-modal-dialog',
  templateUrl: './TrailerDialogModal.html',
  styles: [
    `
      .close-button {
        position: absolute;
        top: -30px;
        right: -24px;
        padding: 0;
        min-width: 40px;
      }
    `
  ]
})
export class TrailerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TrailerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
