import * as fromCoins from './coins.reducer';
import * as fromRoot from '../../reducers';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export const coinsFeatureKey = 'coins';

export interface CoinsState {
    [fromCoins.coinsFeatureKey]: fromCoins.State
}

export interface State extends fromRoot.State {
    [coinsFeatureKey]: CoinsState;
}

export function reducers(state: CoinsState | undefined, action: Action) {
    return combineReducers({
        [fromCoins.coinsFeatureKey]: fromCoins.reducer,
        
    })(state, action);
}

export const selectCoinsState = createFeatureSelector<CoinsState>(coinsFeatureKey);

export const selectCoinsEntitiesState = createSelector(
    selectCoinsState,
    (state) => state.coins
);

export const {
    selectIds: selectCoinIds,
    selectEntities: selectCoinEntities,
    selectAll: selectAllCoins,
    selectTotal: selectTotalCoins,
} = fromCoins.adapter.getSelectors(selectCoinsEntitiesState);
