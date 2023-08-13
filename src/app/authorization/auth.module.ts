import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, SignupComponent } from './components';
import { AuthPageComponent } from './containers';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { SharedModule } from '../shared/shared.module';


export const COMPONENTS = [
  LoginComponent,
  SignupComponent,
]

export const CONTAINERS = [
  AuthPageComponent
]


@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(AuthEffects),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    SharedModule
  ]
})
export class AuthModule { }
