import {Store} from '@ngrx/store';
import {selectGenres, selectPhotos, State} from './index';

export class ClientStateFacade {

    constructor(private store$: Store<State>) {
    }

    getGenres$ = this.store$.select(selectGenres);
    getPhotos$ = this.store$.select(selectPhotos);
}
