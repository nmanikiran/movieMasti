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
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}?api_key=${this.API_KEY}&language=en-US`;
    return this.http.get(movieDetilasUrl).map(function (res: Response) {
      return res.json();
    }).catch(this.handleError);
  }

  getMovieVideos(movieId): Observable<any[]> {
    const movieTrailersUrl = `${this.API_BASE}movie/${movieId}/videos?api_key=${this.API_KEY}&language=en-US`;
    return this.http.get(movieTrailersUrl).map((res: Response) => {
      return res.json();
    }).catch(this.handleError);
  }

  getMovieReviews(movieId): Observable<any[]> {
    const movieReviewUrl = `${this.API_BASE}movie/${movieId}/reviews?api_key=${this.API_KEY}&language=en-US`;
    return this.http.get(movieReviewUrl).map((res: Response) => {
      return res.json();
    }).catch(this.handleError);
  }

  getGenres(): Observable<any[]> {
    const generesUrl = `${this.API_BASE}genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
    return this.http.get(generesUrl)
      .map((response: Response) => response.json()).catch(this.handleError);
  }

  getkeywords(val): Observable<any[]> {
    const generesUrl = `${this.API_BASE}search/keyword?api_key=${this.API_KEY}&query=${val}&page=1`;
    return this.http.get(generesUrl)
      .map((response: Response) => response.json()).catch(this.handleError);
  }

  getDiscover(type, options): Observable<any[]> {
    options.api_key = this.API_KEY;
    const generesUrl = `${this.API_BASE}discover/${type}`;
    return this.http.get(generesUrl, { search: options })
      .map((response: Response) => response.json()).catch(this.handleError);
  }


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
