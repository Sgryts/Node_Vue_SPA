import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinct,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { PhotoService } from '../../services/photo.service';
import { GenreService } from '../../services/genre.service';
import { selectGenres, State } from '../index';
import * as PhotoActions from './actions';
import { get, find } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class PhotosEffects {
  constructor(private action$: Actions, private store$: Store<State>,
              private photoService: PhotoService, private genreService: GenreService) {
  }

  loadPhotosByGenre$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      debounceTime(500),
      ofType(PhotoActions.loadPhotosByGenre),
      withLatestFrom(this.store$.select(selectGenres)),
      switchMap(([{ id }, genres]) => {
        if (id === '') {
          id = (find(genres, g => g.name === 'All'))._id;
        }
        return this.photoService.getPhotosByGenre(id).pipe(
          map((payload) => PhotoActions.loadPhotosByGenreSuccess({ payload })),
          catchError((error) => of(PhotoActions.loadPhotosByGenreFail({ error }))));
      })
    );
  });
}
