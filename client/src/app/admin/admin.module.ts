import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminRoutingModule } from './admin-routing.module';
import { GenresContainerComponent } from './genres/genres.container';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { GenreService } from './services/genre.service';
import { PhotoService } from './services/photo.service';
import { ErrorInterceptor, TokenInterceptor } from './services/token.interceptor.service';
import { FEATURE_NAME, reducers } from './state';
import { AuthEffects } from './state/auth/effects';
import { PhotosEffects } from './state/photos/effects';
import { GenresEffects } from './state/genres/effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { PhotosComponent } from './photos/photos.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AdminStateFacade } from './state/state.facade';

const COMPONENTS =
  [
    DashboardComponent,
    GenresContainerComponent,
    GenresComponent,
    PhotosComponent,
    SidenavComponent,
    HeaderComponent
  ];

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([GenresEffects, PhotosEffects, AuthEffects]),
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
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






