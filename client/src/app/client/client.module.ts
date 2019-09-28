import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ClientRoutingModule} from './client-routing.module';
import {FEATURE_NAME, reducers} from './state';
import {GenresEffects} from './state/genres/effects';
import {PhotosEffects} from './state/photos/effects';

@NgModule({
    imports: [
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([GenresEffects, PhotosEffects]),
    ],
    declarations: [
        BrowserModule,
        ClientRoutingModule
    ]
})
export class ClientModule {
}




