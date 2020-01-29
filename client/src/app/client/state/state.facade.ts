import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGenres, selectPhotos, State } from './index';
import * as GenreActions from './genres/actions';
import * as PhotoActions from './photos/actions';

@Injectable()
export class ClientStateFacade {

  constructor(private store$: Store<State>) {
  }

  getGenres$ = this.store$.select(selectGenres);
  getPhotos$ = this.store$.select(selectPhotos);

  loadGenres(): void {
    this.store$.dispatch(GenreActions.loadAllGenres());
  }

  initLoadPhotos(): void {
    this.store$.dispatch(PhotoActions.initLoadPhotosByGenre());
  }

  loadPhotos(id: string): void {
    this.store$.dispatch(PhotoActions.loadPhotosByGenre({ id: id }));
  }
}
