import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap, tap
} from 'rxjs/operators';
import { PhotoService } from '../../services/photo.service';
import * as PhotoActions from './actions';


@Injectable({
  providedIn: 'root'
})
export class PhotosEffects {
  constructor(
    private action$: Actions,
    private photoService: PhotoService) {
  }

  loadPhotosByGenre$: Observable<Action> = createEffect(() => this.action$.pipe(
    tap(_ => PhotoActions.loadingStarted()),
    debounceTime(500),
    ofType(PhotoActions.loadPhotosByGenre),
    switchMap(({ id }: { id: string }) => this.photoService.getPhotosByGenre(id).pipe(
      map((payload) => PhotoActions.loadPhotosByGenreSuccess({ payload })),
      catchError((error) => of(PhotoActions.loadPhotosByGenreFail({ error }))))
    )
  ));
}
