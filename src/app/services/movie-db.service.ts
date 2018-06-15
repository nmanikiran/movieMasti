import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class MovieDBService {
  API_BASE = 'https://api.themoviedb.org/3/';
  API_KEY = 'e98136de756705459104be0a2c27f514';
  body: any;
  err: any;

  constructor(private http: HttpClient) {}

  formatParams(options) {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'en-US');

    if (options) {
      Object.keys(options).forEach(function(key) {
        params = params.append(key, options[key]);
      });
    }
    return { params };
  }
  sortByList(): Array<any> {
    return [
      { key: 'popularity.desc', value: 'Popularity Descending' },
      { key: 'popularity.asc', value: 'Popularity Ascending' },
      { key: 'vote_count.asc', value: 'Rating Ascending' },
      { key: 'vote_count.desc', value: 'Rating Descending' },
      { key: 'primary_release_date.desc', value: 'Release Date Descending' },
      { key: 'primary_release_date.asc', value: 'Release Date Ascending' }
    ];
  }

  getYears(): Array<number> {
    let year = new Date().getFullYear();
    let yearList = [];
    for (let i = 0; i < 25; i++) {
      yearList.push(year - i);
    }
    return yearList;
  }

  getMovies(type): Observable<Response> {
    type = type || 'popular';
    return this.http
      .get(`${this.API_BASE}movie/${type}`, this.formatParams({}))
      .pipe(
        map((res: Response) => res),
        catchError(this.handleError)
      );
  }

  getMovieDetails(movieId): Observable<Response> {
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}`;
    return this.http.get(movieDetilasUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getMovieVideos(movieId): Observable<Response> {
    const movieTrailersUrl = `${this.API_BASE}movie/${movieId}/videos`;
    return this.http.get(movieTrailersUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getMovieReviews(movieId): Observable<Response> {
    const movieReviewUrl = `${this.API_BASE}movie/${movieId}/reviews`;
    return this.http.get(movieReviewUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getGenres(): Observable<Response> {
    const generesUrl = `${this.API_BASE}genre/movie/list`;
    return this.http.get(generesUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getkeywords(val): Observable<Response> {
    const generesUrl = `${this.API_BASE}search/keyword?api_key=${
      this.API_KEY
    }&query=${val}&page=1`;

    return this.http.get(generesUrl).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getDiscover(type, options): Observable<Response> {
    options.api_key = this.API_KEY;
    const discoverUrl = `${this.API_BASE}discover/${type}`;
    return this.http.get(discoverUrl, this.formatParams(options)).pipe(
      map((res: any) => {
        const placeholderImg =
          'http://via.placeholder.com/500x281?text=MovieMasti';
        const imgUrl = `http://image.tmdb.org/t/p/w500`;
        return res.results.map(item => {
          item.poster_path = item.poster_path
            ? `${imgUrl}/${item.poster_path}`
            : placeholderImg;
          item.backdrop_path = item.backdrop_path
            ? `${imgUrl}/${item.backdrop_path}`
            : placeholderImg;
          item.overview = item.overview.substr(0, 100) + '...';
          return item;
        });
      }),
      catchError(this.handleError)
    );
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
