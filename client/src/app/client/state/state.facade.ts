import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGenres, selectPhotos, isSpinnerActive, State } from './index';
import * as GenreActions from './genres/actions';
import * as PhotoActions from './photos/actions';

@Injectable()
export class ClientStateFacade {

  constructor(private store$: Store<State>) {
  }

  getGenres$ = this.store$.select(selectGenres);
  getPhotos$ = this.store$.select(selectPhotos);
  isSpinnerActive$ = this.store$.select(isSpinnerActive);

  loadGenres(): void {
    this.store$.dispatch(GenreActions.loadAllGenres());
  }

  loadPhotosByGenre(id: string): void {
    this.store$.dispatch(PhotoActions.loadPhotosByGenre({ id: id }));
  }
}
