import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, distinct, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { State } from '../index';
import { GenreService } from '../../services/genre.service';
import * as GenreActions from './actions';

@Injectable({
  providedIn: 'root'
})
export class GenresEffects {
  constructor(private action$: Actions, private store$: Store<State>,
              private genreService: GenreService) {
  }

  loadGenres$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(GenreActions.loadAllGenres),
      switchMap(() => {
        return this.genreService.getAllGenres().pipe(
          distinct(),
          map((payload) => GenreActions.loadAllGenresSuccess({ payload })),
          catchError(error => of(GenreActions.loadAllGenresFail({ error }))));
      })
    );
  });
}
