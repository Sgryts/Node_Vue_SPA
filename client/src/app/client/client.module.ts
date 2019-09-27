import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ClientRoutingModule} from './client-routing.module';
import {FEATURE_NAME, reducers} from './state';
import {ClientEffects} from './state/effects';

@NgModule({
    imports: [
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([ClientEffects]),
    ],
    declarations: [
        BrowserModule,
        ClientRoutingModule
    ]
})
export class ClientModule {
}




