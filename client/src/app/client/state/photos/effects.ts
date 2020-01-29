import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinct, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { GenreService } from '../../services/genre.service';
import { State } from '../index';
import * as PhotoActions from './actions';
import { find } from 'lodash';


@Injectable()
export class PhotosEffects {
  constructor(private action$: Actions, private store$: Store<State>,
              private photoService: PhotoService, private genreService: GenreService) {
  }

  private readonly defaultGenreId = '000000000000000000000000';

  @Effect()
  initLoadPhotos$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(PhotoActions.initLoadPhotosByGenre),
      switchMap(() => this.genreService.getAllGenres()),
      map((genres: IGenre[]): string => {
          const genre = find(genres, g => g.name !== 'All');
          return genre ? genre._id : this.defaultGenreId;
        }
      ),
      mergeMap((id: string) => this.photoService.getPhotosByGenre(id).pipe(
        map((payload: IPhoto[]) => PhotoActions.initLoadPhotosByGenreSuccess({ payload })),
      )),
      catchError(error => of(PhotoActions.initLoadPhotosByGenreFail({ error }))),
    )
  });

  @Effect()
  loadPhotos$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(PhotoActions.loadPhotosByGenre),
      debounceTime(500),
      switchMap(({ id }) => {
        return this.photoService.getPhotosByGenre(id).pipe(
          map((payload) => PhotoActions.loadPhotosByGenreSuccess({ payload })),
          distinct(),
          catchError((error) => of(PhotoActions.loadPhotosByGenreFail({ error }))));
      })
    );
  });
}
