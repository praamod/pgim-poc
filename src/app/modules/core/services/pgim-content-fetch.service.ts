import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CookieService } from '@gorniv/ngx-universal';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from 'src/app/configs/app.config';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class PgimContentFetchService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  getPgimContent(url: any = AppConfig.drupalEndpoint) {
    return this.httpClient
      .get(
        `${url}`
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
