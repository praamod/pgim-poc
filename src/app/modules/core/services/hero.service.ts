import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CookieService } from '@gorniv/ngx-universal';
import { Observable, of } from 'rxjs';

import { AppConfig } from '../../../configs/app.config';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
              private snackBar: MatSnackBar,
              private cookieService: CookieService) {
  }

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

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
