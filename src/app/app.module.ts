import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers';
import { ROOT_REDUCERS } from './reducers';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './core/effects';
import { SnakeToCamelInterceptor } from './core/interceptors';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxPaginationModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(RouterEffects),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SnakeToCamelInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  declarations: [
  ]
})
export class AppModule { }
