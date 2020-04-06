import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum } from 'ngx-lightbox';
import { Observable, of } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';
import { ClientStateFacade } from '../../state/state.facade';

@Component({
  selector: 'client-portfolio-container',
  templateUrl: './portfolio.container.component.html',
  styleUrls: ['']
})
export class PortfolioContainerComponent implements OnInit, OnDestroy {
  genres$: Observable<IGenre[]>;
  isLoading$: Observable<boolean>;
  albums: Array<IAlbum> = [];
  isActive = true;

  constructor(private clientFacade: ClientStateFacade,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading$ = this.clientFacade.isSpinnerActive$;
    this.isLoading$.pipe(
      tap(l => console.log("l", l))).subscribe(console.log);
    const genreId = this.activatedRoute.snapshot.queryParamMap.get('genre');
    this.clientFacade.loadGenres();
    this.clientFacade.loadPhotosByGenre(genreId);
    this.genres$ = this.clientFacade.getGenres$.pipe(
      map(g => g),
      tap(res => console.log('GENRES', res)),
    );
    this.clientFacade.getPhotos$.pipe(
      takeWhile(_ => this.isActive),
      map((p): IPhoto[] => p),
      tap(res => console.log('PHOTOS', res)),
    ).subscribe((photos: IPhoto[]) => {
      this.albums = [];
      photos.forEach((p: IPhoto): void => {
        this.albums.push({
          src: `${environment.baseUrl}/${p.file}`,
          caption: p.name,
          thumb: `${environment.baseUrl}/${p.file}`
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.isActive = false;
  }
}
