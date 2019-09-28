import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AdminRoutingModule} from './admin-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import {ErrorInterceptor, TokenInterceptor} from './services/token.interceptor.service';
import {FEATURE_NAME, reducers} from './state';
import {ClientEffects} from './state/effects';

@NgModule({
    imports: [
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([ClientEffects]),
    ],
    declarations: [
        BrowserModule,
        AdminRoutingModule
    ],
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
        }
    ],

})
export class ClientModule {
}





