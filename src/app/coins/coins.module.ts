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
import { CoinEffects, CoinsEffects, FavoritesEffects, SearchEffects } from './effects';
import { CoinsTableItemComponent } from './components/coins-table-item/coins-table-item.component';
import { CoinsHeaderComponent } from './components/coins-header/coins-header.component';
import { SparklinePipe} from './pipes/sparkline-pipe.pipe';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { SharedModule } from '../shared/shared.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CoinPageComponent } from './containers/coin-page/coin-page.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { CoinPriceChartComponent } from './components/coin-price-chart/coin-price-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



export const COMPONENTS = [
  CoinsTableComponent,
  CoinsTableItemComponent,
  CoinsHeaderComponent,
  SparklinePipe, 
  RoundNumberPipe, 
  DropdownComponent,
  CoinDetailsComponent,
  CoinPriceChartComponent
];

export const CONTAINERS = [
  CoinsListingPageComponent,
  FavoriteCoinsListingPageComponent,
  SearchCoinsPageComponent,
  CoinPageComponent
];


@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromCoins.coinsFeatureKey, fromCoins.reducers),
    EffectsModule.forFeature(CoinsEffects, FavoritesEffects, SearchEffects, CoinEffects),
  ],
  exports: [...COMPONENTS, ...CONTAINERS],
})
export class CoinsModule { }
