import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import IGenre from '../../../models/genre.model';
import { AdminStateFacade } from '../../state/state.facade';

@Component({
  selector: 'admin-genres-container',
  templateUrl: './genres-container.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresContainerComponent implements OnInit, OnDestroy, OnChanges {
  genres$: Observable<IGenre[]>;
  public isComponentActive: boolean = true;

  constructor(private adminFacade: AdminStateFacade) {
  }

  ngOnInit(): void {
    this.adminFacade.loadGenres();
    this.genres$ = this.adminFacade.getGenres$.pipe(
      takeWhile((): boolean => this.isComponentActive),
      tap(g => console.log('GGG', g))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public addGenre(genre: string): void {
    this.adminFacade.createGenre$(genre);
  }

  public updateGenre(genre: IGenre): void {
    this.adminFacade.updateGenre$(genre);
  }

  public deleteGenre(id: string): void {
    this.adminFacade.deleteGenre$(id);
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
