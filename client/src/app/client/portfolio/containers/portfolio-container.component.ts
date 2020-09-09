import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum } from 'ngx-lightbox';
import { Observable } from 'rxjs';
import { map, takeWhile, tap, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';
import { ClientStateFacade } from '../../state/state.facade';
import { SharedStylingService } from '../../shared/shared.service';

@Component({
  selector: 'client-portfolio-container',
  templateUrl: './portfolio-container.component.html',
})
export class PortfolioContainerComponent implements OnInit, OnDestroy {
  public genres$: Observable<IGenre[]>;
  public isLoading$: Observable<boolean>;
  public albums: Array<IAlbum> = [];
  public isActive = true;

  constructor(private clientFacade: ClientStateFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedStylingService) {
  }

  ngOnInit(): void {
    this.sharedService.isDarkColorSubject.next(true);
    this.isLoading$ = this.clientFacade.isSpinnerActive$;

    this.initializeGallery();
  }

  private initializeGallery(): void {
    this.clientFacade.loadGenres();
    this.genres$ = this.clientFacade.getGenres$;

    this.genres$.pipe(
      filter((genres: IGenre[]): boolean => !!genres.length),
      map((genres: IGenre[]): string =>
        genres?.find((g: IGenre): boolean =>
          g.name === 'All')?._id ?? ''),
      tap((genreId: string): void => {
        this.onGenreSelected(genreId);
        this.getPhotos();
      }),
      takeWhile(_ => this.isActive)
    ).subscribe();
  }

  private getPhotos(): void {
    this.clientFacade.getPhotos$.pipe(
      map((p): IPhoto[] => p),
      takeWhile(_ => this.isActive),
    ).subscribe((photos: IPhoto[]) => {
      this.albums = [];
      photos.map((p: IPhoto): void => {
        this.albums.push({
          src: `${environment.baseUrl}/${p.file}`,
          caption: p.name,
          thumb: `${environment.baseUrl}/${p.file}`
        });
      });
    });
  }

  public onGenreSelected(id: string): void {
    this.updateQueryParams(id);
    this.clientFacade.loadPhotosByGenre(id);
  }

  private updateQueryParams(id: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams:
      {
        genre: id
      },
      replaceUrl: true,
    });
  }

  ngOnDestroy(): void {
    this.isActive = false;
  }
}
