import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdminRoutingModule } from './admin-routing.module';
import { GenresContainerComponent } from './genres/containers/genres-container.component';
import { AuthGuard } from './guards/auth.guard';
import { PhotosGalleryComponent } from './photos/components/gallery/photos-gallery.component';
import { PhotosUploadComponent } from './photos/components/upload/photos-upload.component';
import { PhotosUploadContainerComponent } from './photos/containers/photos-upload-container.component';
import { PhotosContainerComponent } from './photos/containers/photos-container.component';
import { AuthService } from './services/auth.service';
import { GenreService } from './services/genre.service';
import { PhotoService } from './services/photo.service';
import { ErrorInterceptor, TokenInterceptor } from './services/token.interceptor.service';
import { FEATURE_NAME, reducers } from './state';
import { AuthEffects } from './state/auth/effects';
import { PhotosEffects } from './state/photos/effects';
import { GenresEffects } from './state/genres/effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/components/genres.component';
import { PhotosComponent } from './photos/components/photos.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AdminStateFacade } from './state/state.facade';
import { PhotosDeleteDialogComponent } from './photos/components/gallery/dialogs/photos-delete-dialog.component';
import { PhotosEditDialogComponent } from './photos/components/gallery/dialogs/photos-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const COMPONENTS =
  [
    DashboardComponent,
    GenresContainerComponent,
    GenresComponent,
    PhotosContainerComponent,
    PhotosComponent,
    PhotosUploadComponent,
    SidenavComponent,
    HeaderComponent,
    PhotosUploadContainerComponent,
    PhotosGalleryComponent,
    PhotosDeleteDialogComponent,
    PhotosEditDialogComponent
  ];

const ENTRY_COMPONENTS =
  [
    PhotosDeleteDialogComponent,
    PhotosEditDialogComponent
  ];

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([GenresEffects, PhotosEffects, AuthEffects]),
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    GenreService,
    PhotoService,
    AdminStateFacade
  ],

})
export class AdminModule {
}






