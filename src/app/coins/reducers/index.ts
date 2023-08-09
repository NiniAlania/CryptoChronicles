import * as fromCoins from './coins.reducer';
import * as fromCoinsList from './coins-list.reducer';
import * as fromFavorites from './favorites.reducer';
import * as fromPage from './page.reducer';
import * as fromRoot from '../../reducers';
import * as fromSearch from './search.reducer';
import * as fromCoin from './coin.reducer';

import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export const coinsFeatureKey = 'coins';

export interface CoinsState {
    [fromCoins.coinsFeatureKey]: fromCoins.State,
    [fromCoinsList.coinsListFeatureKey]: fromCoinsList.State,
    [fromFavorites.favoritesFeatureKey]: fromFavorites.State,
    [fromPage.pageFeatureKey]: fromPage.State,
    [fromSearch.searchFeatureKey]: fromSearch.State,
    [fromCoin.coinFeatureKey]: fromCoin.State
}

export interface State extends fromRoot.State {
    [coinsFeatureKey]: CoinsState;
}

export function reducers(state: CoinsState | undefined, action: Action) {
    return combineReducers({
        [fromCoins.coinsFeatureKey]: fromCoins.reducer,
        [fromCoinsList.coinsListFeatureKey]: fromCoinsList.reducer,
        [fromFavorites.favoritesFeatureKey]: fromFavorites.reducer,
        [fromPage.pageFeatureKey]: fromPage.reducer,
        [fromSearch.searchFeatureKey]: fromSearch.reducer,
        [fromCoin.coinFeatureKey]: fromCoin.reducer
    })(state, action);
}

export const selectCoinsState = createFeatureSelector<CoinsState>(coinsFeatureKey);

export const selectCoinsEntitiesState = createSelector(
    selectCoinsState,
    (state) => state.coins
);

export const selectCoinsListEntitiesState = createSelector(
    selectCoinsState,
    (state) => state.coinsList
)

export const selectFavoritesEntitiesState = createSelector(
    selectCoinsState,
    (state) => state.favorites
)

export const selectPageEntitiesState = createSelector(
    selectCoinsState,
    (state) => state.page
)

export const {
    selectIds: selectCoinIds,
    selectEntities: selectCoinEntities,
    selectAll: selectAllCoins,
    selectTotal: selectTotalCoins,
} = fromCoins.adapter.getSelectors(selectCoinsEntitiesState);

export const selectIsFavorite = createSelector(
    selectCoinsEntitiesState,
    (state) => state.isFavorite
)

export const {
    selectIds: selectCoinListIds,
    selectEntities: SelectCoinListEntities,
    selectTotal: selectCoinListTotal,
    selectAll: selectCoinListAll
} = fromCoinsList.adapter.getSelectors(selectCoinsListEntitiesState);


export const {
    selectIds: selectFavoritesIds,
    selectEntities: selectFavoritesEntities,
    selectTotal: selectFavoritesTotal,
    selectAll: selecctAllFavorites
} = fromFavorites.adapter.getSelectors(selectFavoritesEntitiesState);


export const selectPageSize = createSelector(
    selectPageEntitiesState,
    (state) => state.pageSize
)

export const selectSearch = createSelector(
    selectCoinsState,
    (state) => state.search
)

export const selectSearchResult = createSelector(
    selectSearch,
    (state) => state.searchResults
)

export const selectCoinState = createSelector(
    selectCoinsState,
    (state) => state.coin
)

export const selectCoinDetails = createSelector(
    selectCoinState,
    (state) => state.coinDetails
)

export const selectCoinPrices = createSelector(
    selectCoinState,
    (state) => state.coinPrices
)

export const selectCoinInfo = createSelector(
    selectCoinState,
    (state) => state.coinInfo
)