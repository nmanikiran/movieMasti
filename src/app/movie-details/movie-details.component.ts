import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    private route: ActivatedRoute,
    private dbService: MovieDBService,
    public dialog: MatDialog,
    public domSanitizer: DomSanitizer
  ) {
    this.domSanitizer = domSanitizer;
    this.movieId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMovieDetails(this.movieId);
  }

  getMovieDetails(id) {
    this.dbService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.movie.poster_path = `http://image.tmdb.org/t/p/w500/${
        this.movie.poster_path
      }`;
      this.movie.backdrop_path = `http://image.tmdb.org/t/p/original/${
        this.movie.backdrop_path
      }`;
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

  selectChange(event: number) {
    if (event === 1) {
      this.getMovieVideos();
    } else if (event === 2) {
      this.getMovieReviews();
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
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'trailer-modal-dialog',
  templateUrl: './TrailerDialogModal.html',
  styles: [
    `.close-button{
        position: absolute;
       top: -30px;
        right: -24px;
        padding: 0;
        min-width: 40px;
    }`
  ]
})
export class TrailerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TrailerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
