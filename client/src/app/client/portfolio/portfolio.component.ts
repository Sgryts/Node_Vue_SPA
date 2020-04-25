// import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
// import { DomSanitizer, ɵDomSanitizerImpl } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { orderBy } from 'lodash';
// import { IAlbum } from 'ngx-lightbox/lightbox-event.service';
// import { Observable, of } from 'rxjs';
// import { map, takeWhile, tap } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';
// import IGenre from '../../models/genre.model';
// import IPhoto from '../../models/photo.model';
// import { ClientStateFacade } from '../state/state.facade';
// import { Lightbox } from 'ngx-lightbox';
//
// @Component({
//   selector: 'client-portfolio',
//   templateUrl: './portfolio.component.html',
//   styleUrls: ['./portfolio.component.css']
// })
// export class PortfolioComponent implements OnInit, OnDestroy {
//   photos$: Observable<IPhoto[]>;
//   genres$: Observable<IGenre[]>;
//   isLoading$: Observable<boolean>;
//   albums: Array<IAlbum> = [];
//   isActive = true;
//
//   constructor(private clientFacade: ClientStateFacade,
//               private router: Router,
//               private activatedRoute: ActivatedRoute,
//               private lightbox: Lightbox,
//               private location: Location) {
//   }
//
//   ngOnInit() {
//     this.isLoading$ = this.clientFacade.isSpinnerActive$;
//     this.isLoading$.pipe(
//       tap(l => console.log("l", l))).subscribe(console.log);
//     // this.isLoading$ = of(false);
//     // const genreId = this.activatedRoute.snapshot.paramMap.get('id');
//     const genreId = this.activatedRoute.snapshot.queryParamMap.get('genre');
//     this.clientFacade.loadGenres();
//     this.clientFacade.loadPhotosByGenre(genreId);
//     this.genres$ = this.clientFacade.getGenres$.pipe(
//       map(g => g),
//       tap(res => console.log('GENRES', res)),
//     );
//     this.clientFacade.getPhotos$.pipe(
//       takeWhile(_ => this.isActive),
//       map((p): IPhoto[] => p),
//       tap(res => console.log('PHOTOS', res)),
//     ).subscribe((photos: IPhoto[]) => {
//       this.albums = [];
//       photos.forEach((p: IPhoto): void => {
//         this.albums.push({
//           src: `${environment.baseUrl}/${p.file}`,
//           caption: p.name,
//           thumb: `${environment.baseUrl}/${p.file}`
//         });
//       });
//     });
//   }
//
//   // private initLoadPhotos(id: string): void {
//   //   if (id === '') {
//   //     this.clientFacade.initLoadPhotos();
//   //   } else {
//   //     this.clientFacade.loadPhotos(id);
//   //   }
//   // }
//
//   // private updateUrl(id: string): void {
//   //   this.location.go(`genres/${id}/photos`);
//   // }
//
//   open(index: number): void {
//     this.lightbox.open(this.albums, index,
//       { wrapAround: true, showImageNumberLabel: true });
//   }
//
//   close(): void {
//     this.lightbox.close();
//   }
//
//   onGenreSelected(id: string): void {
//     this.clientFacade.loadPhotosByGenre(id);
//   }
//
//   ngOnDestroy(): void {
//     this.isActive = false;
//   }
// }
