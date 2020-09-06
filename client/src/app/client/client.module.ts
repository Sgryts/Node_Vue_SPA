import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LightboxModule } from 'ngx-lightbox';
import { ClientRoutingModule } from './client-routing.module';
import { AboutComponent } from './about/components/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/components/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './portfolio/components/gallery.component';
import { PortfolioComponent } from './portfolio/components/portfolio.component';
import { PortfolioContainerComponent } from './portfolio/containers/portfolio-container.component';
import { GenreService } from './services/genre.service';
import { PhotoService } from './services/photo.service';
import { ContactService } from './services/contact.service';
import { PageNotFoundComponent } from './shared/PageNotFound.component';
import { FEATURE_NAME, reducers } from './state';
import { GenresEffects } from './state/genres/effects';
import { PhotosEffects } from './state/photos/effects';
import { ClientStateFacade } from './state/state.facade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([GenresEffects, PhotosEffects]),
    ClientRoutingModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    LightboxModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  declarations: [
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    PortfolioContainerComponent,
    GalleryComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  providers: [
    GenreService,
    PhotoService,
    ContactService,
    ClientStateFacade
  ]
})
export class ClientModule {
}




