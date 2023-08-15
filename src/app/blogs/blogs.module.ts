import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogPageComponent, BlogsPageComponent } from './containers';
import * as fromBlogs from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects, BlogsEffects } from './effects';
import { SharedModule } from '../shared/shared.module';
import { BlogCardComponent } from './components';



export const COMPONENTS = [
  BlogCardComponent
]

export const CONTAINERS = [
  BlogsPageComponent,
  BlogPageComponent
];


@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    CommonModule,
    SharedModule,
    BlogsRoutingModule,
    StoreModule.forFeature(fromBlogs.blogsFeatureKey, fromBlogs.reducers),
    EffectsModule.forFeature(BlogEffects, BlogsEffects)
  ],
  exports: [ ...CONTAINERS ]
})
export class BlogsModule { }
