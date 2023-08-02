import * as fromCoins from './coins.reducer';
import * as fromCoinsList from './coins-list.reducer';
import * as fromRoot from '../../reducers';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export const coinsFeatureKey = 'coins';

export interface CoinsState {
    [fromCoins.coinsFeatureKey]: fromCoins.State,
    [fromCoinsList.coinsListFeatureKey]: fromCoinsList.State
}

export interface State extends fromRoot.State {
    [coinsFeatureKey]: CoinsState;
}

export function reducers(state: CoinsState | undefined, action: Action) {
    return combineReducers({
        [fromCoins.coinsFeatureKey]: fromCoins.reducer,
        [fromCoinsList.coinsListFeatureKey]: fromCoinsList.reducer
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

export const {
    selectIds: selectCoinIds,
    selectEntities: selectCoinEntities,
    selectAll: selectAllCoins,
    selectTotal: selectTotalCoins,
} = fromCoins.adapter.getSelectors(selectCoinsEntitiesState);

export const {
    selectIds: selectCoinListIds,
    selectEntities: SelectCoinListEntities,
    selectTotal: selectCoinListTotal
} = fromCoinsList.adapter.getSelectors(selectCoinsListEntitiesState);

export const selectPage = createSelector(
    selectCoinsEntitiesState, 
    (state) => state.page
)

export const selectPageSize = createSelector(
    selectCoinsEntitiesState,
    (state) => state.pageSize
)

