import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import IGenre from '../../models/genre.model';
import { AdminStateFacade } from '../state/state.facade';

@Component({
  selector: 'app-genres-container',
  templateUrl: './genres.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresContainerComponent implements OnInit, OnDestroy {
  genres$: Observable<IGenre[]>;
  public isComponentActive: boolean = true;

  constructor(private adminFacade: AdminStateFacade) {
  }

  ngOnInit(): void {
    this.adminFacade.loadGenres();
    this.genres$ = this.adminFacade.getGenres$.pipe(
      takeWhile((): boolean => this.isComponentActive)
    )
  }

  public addGenre(genre: string): void {

  }

  public updateGenre(genre: IGenre): void {

  }

  public deleteGenre(id: string): void {

  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

// TODO:
// 1. If form clean -> Add genre call
// 2. Check on type if already exists
// 3. validation + errors
// 4.pagination

}
