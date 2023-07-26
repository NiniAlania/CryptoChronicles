import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsTableComponent } from './components';
import { CoinsListingPageComponent } from './containers';
import { FavoriteCoinsListingPageComponent } from './containers/favorite-coins-listing-page/favorite-coins-listing-page.component';
import { SearchCoinsPageComponent } from './containers/search-coins-page/search-coins-page.component';
import * as fromCoins from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoinsEffects } from './effects';
import { CoinsTableItemComponent } from './components/coins-table-item/coins-table-item.component';
import { CoinsHeaderComponent } from './components/coins-header/coins-header.component';
import { SparklinePipe} from './pipes/sparkline-pipe.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';


export const COMPONENTS = [
  CoinsTableComponent,
  CoinsTableItemComponent,
  CoinsHeaderComponent
];

export const CONTAINERS = [
  CoinsListingPageComponent,
  FavoriteCoinsListingPageComponent,
  SearchCoinsPageComponent
];


@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS, SparklinePipe, RoundNumberPipe],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    StoreModule.forFeature(fromCoins.coinsFeatureKey, fromCoins.reducers),
    EffectsModule.forFeature(CoinsEffects),
  ],
  exports: [...COMPONENTS, ...CONTAINERS],
})
export class CoinsModule { }
