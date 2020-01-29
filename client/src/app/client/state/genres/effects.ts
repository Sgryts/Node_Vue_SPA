import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, distinct, map, mergeMap, take } from 'rxjs/operators';
import { State } from '../index';
import { GenreService } from '../../services/genre.service';
import * as GenreActions from './actions';

@Injectable()
export class GenresEffects {
  constructor(private action$: Actions, private store$: Store<State>,
              private genreService: GenreService) {
  }

  @Effect()
  loadGenres$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(GenreActions.loadAllGenres),
      mergeMap(() => {
        return this.genreService.getAllGenres().pipe(
          map((payload) => GenreActions.loadAllGenresSuccess({ payload })),
          distinct(),
          catchError(error => of(GenreActions.loadAllGenresFail({ error }))));
      })
    );
  });
}
