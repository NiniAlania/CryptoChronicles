import { NgModule, isDevMode } from '@angular/core';
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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './authorization/auth.module';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(RouterEffects),
    StoreDevtoolsModule.instrument({
      name: 'Crypto Chronicles DevTools',
      logOnly: !isDevMode(),
    }),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SnakeToCamelInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  declarations: [
  ]
})
export class AppModule { }
