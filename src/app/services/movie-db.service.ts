import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieDBService {

  API_BASE = 'https://api.themoviedb.org/3/';
  API_KEY = 'e98136de756705459104be0a2c27f514';
  body: any; err: any;

  constructor(private http: HttpClient) { }

  formatParams(options) {
    let params = new HttpParams().set('api_key', this.API_KEY)
      .set('language', 'en-US');

    if (options) {
      Object.keys(options).forEach(function (key) {
        params = params.append(key, options[key]);
      });
    }
    return { params };
  }

  getYears(): Array<number> {
    let year = new Date().getFullYear();
    let yearList = [];
    for (let i = 0; i < 25; i++) {
      yearList.push(year - i);
    }
    return yearList;
  }

  getMovies(type): Observable<any[]> {
    type = type || 'popular';
    return this.http.get(`${this.API_BASE}movie/${type}`, this.formatParams({}))
      .map(function (res: Response) {
        return res;
      }).catch(this.handleError);
  }

  getMovieDetails(movieId): Observable<any[]> {
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}`;
    return this.http.get(movieDetilasUrl, this.formatParams({}))
      .map(function (res: Response) {
        return res;
      }).catch(this.handleError);
  }

  getMovieVideos(movieId): Observable<any[]> {
    const movieTrailersUrl = `${this.API_BASE}movie/${movieId}/videos`;
    return this.http.get(movieTrailersUrl, this.formatParams({}))
      .map((res: Response) => {
        return res;
      }).catch(this.handleError);
  }

  getMovieReviews(movieId): Observable<any[]> {
    const movieReviewUrl = `${this.API_BASE}movie/${movieId}/reviews`;
    return this.http.get(movieReviewUrl, this.formatParams({}))
      .map((res: Response) => {
        return res;
      }).catch(this.handleError);
  }

  getGenres(): Observable<any[]> {
    const generesUrl = `${this.API_BASE}genre/movie/list`;
    return this.http.get(generesUrl, this.formatParams({}))
      .map((response: Response) => response).catch(this.handleError);
  }

  getkeywords(val): Observable<any[]> {
    const generesUrl = `${this.API_BASE}search/keyword?api_key=${this.API_KEY}&query=${val}&page=1`;
    return this.http.get(generesUrl)
      .map((response: Response) => response).catch(this.handleError);
  }

  getDiscover(type, options): Observable<any[]> {
    options.api_key = this.API_KEY;
    const generesUrl = `${this.API_BASE}discover/${type}`;
    return this.http.get(generesUrl, this.formatParams(options))
      .map((response: Response) => response).catch(this.handleError);
  }


  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      this.body = error || '';
      this.err = this.body.error || JSON.stringify(this.body);
      errMsg = `${error.status} - ${error.statusText || ''} ${this.err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
