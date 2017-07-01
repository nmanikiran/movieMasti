import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieDBService {

  API_BASE = 'https://api.themoviedb.org/3/';
  API_KEY = 'e98136de756705459104be0a2c27f514';
  body: any; err: any;

  constructor(private http: Http) { }

  getMovies(type): Observable<any[]> {
    type = type || 'popular';
    return this.http.get(`${this.API_BASE}movie/${type}?api_key=${this.API_KEY}&language=en-US`).map(function (res: Response) {
      return res.json();
    }).catch(this.handleError);
  }

  getMovieDetails(movieId): Observable<any[]> {
    return this.http.get(`${this.API_BASE}movie/${movieId}?api_key=${this.API_KEY}&language=en-US`).map(function (res: Response) {
      return res.json();
    }).catch(this.handleError);
  }

  getMovieVideos(movieId): Observable<any[]> {
    return this.http.get(`${this.API_BASE}movie/${movieId}/videos?api_key=${this.API_KEY}&language=en-US`).map((res: Response) => {
      return res.json();
    }).catch(this.handleError);
  }

  getMovieReviews(movieId): Observable<any[]> {
    return this.http.get(`${this.API_BASE}movie/${movieId}/reviews?api_key=${this.API_KEY}&language=en-US`).map((res: Response) => {
      return res.json();
    }).catch(this.handleError);
  }


  // Popular
  //https://api.themoviedb.org/3/movie/popular?api_key=e98136de756705459104be0a2c27f514&language=en-US&page=1
  //Reviews of movie id
  //https://api.themoviedb.org/3/movie/297762/reviews?api_key=e98136de756705459104be0a2c27f514&language=en-US&page=1

  // Top Rate Movies
  //https://api.themoviedb.org/3/movie/top_rated?api_key=e98136de756705459104be0a2c27f514&language=en-US&page=1

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      this.body = error.json() || '';
      this.err = this.body.error || JSON.stringify(this.body);
      errMsg = `${error.status} - ${error.statusText || ''} ${this.err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
