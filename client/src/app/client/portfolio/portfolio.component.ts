import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderBy } from 'lodash';
import { map, tap } from 'rxjs/operators';
import IPhoto from '../../models/photo.model';
import { ClientStateFacade } from '../state/state.facade';
import { flatten } from 'lodash';

@Component({
  selector: 'client-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  photos$: IPhoto[];
  genres$;
  isLoading: boolean;
  private readonly defaultGenreId = '000000000000000000000000';

  constructor(private clientFacade: ClientStateFacade,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
    const genreId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('route', genreId);
    this.clientFacade.loadGenres();
    // this.clientFacade.genreId('5cbfc751ba16b6b4824ca001');
    this.initLoadPhotos(genreId);
    this.genres$ = this.clientFacade.getGenres$.pipe(
      map(g => orderBy(g.genres, 'name')),
      tap(res => console.log('RES-g', res)),
      tap(res => this.isLoading = false)
    );

    this.clientFacade.getPhotos$.pipe(
      map(p => flatten(p.photos)),
      tap(res => console.log('RES-p', res)),
      tap(res => this.isLoading = false)
    ).subscribe(console.log);

    // TODO: when done =>
    // update url
  }

  private initLoadPhotos(id: string): void {
    if (id === this.defaultGenreId) {
      this.clientFacade.initLoadPhotos();
    } else {
      this.clientFacade.loadPhotos(id);
    }
  }

  onGenreSelected(id: string): void {
    this.clientFacade.loadPhotos(id);
  }
}
