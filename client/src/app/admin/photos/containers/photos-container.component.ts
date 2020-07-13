import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum } from 'ngx-lightbox';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, takeWhile, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';
import { AdminStateFacade } from '../../state/state.facade';

@Component({
  selector: 'admin-photos-container',
  templateUrl: './photos-container.component.html',
})
export class PhotosContainerComponent implements OnInit, OnDestroy {
  public photos$: Observable<IPhoto[]>;
  public genres$: Observable<IGenre[]>;
  public isLoading$: Observable<boolean>;
  public albums: Array<IAlbum & Partial<IPhoto>> = [];
  public isActive = true;

  constructor(private adminFacade: AdminStateFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.adminFacade.isLoaded$;
    const genreId = this.activatedRoute.snapshot.queryParamMap.get('genre');
    this.adminFacade.loadGenres();
    this.genres$ = this.adminFacade.getGenres$;
    combineLatest([this.genres$])
      .pipe(takeWhile(_ => this.isActive),
        filter(genres => return genres[0]?.length > 0; }),
        tap((genres) => return this.onGenreSelected(genreId); }))
      .subscribe();
    this.getPhotos();
    this.photos$ = this.adminFacade.getPhotos$;
  }

  private getPhotos(): void {
    this.adminFacade.getPhotos$.pipe(
      takeWhile(_ => this.isActive),
      map((p): IPhoto[] => p),
    ).subscribe((photos: IPhoto[]) => {
      this.albums = [];
      photos.map((p: IPhoto): void => {
        this.albums.push({
          _id: p._id,
          name: p.name,
          genres: p.genres,
          src: `${environment.baseUrl}/${p.file}`,
          caption: p.name,
          thumb: `${environment.baseUrl}/${p.file}`
        });
      });
    });
  }

  public onGenreSelected(id: string): void {
    this.updateQueryParams(id);
    this.adminFacade.loadPhotosByGenre(id);
  }

  public onPhotoUpdated(photo: Partial<IPhoto>): void {
    this.adminFacade.updatePhoto$(photo);
  }

  public onPhotoDeleted(id: string): void {
    this.adminFacade.deletePhoto$(id);
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
