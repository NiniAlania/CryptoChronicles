import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoinMarketData } from "../models";
import { createReducer, on } from "@ngrx/store";
import { CoinsListingPageActions } from "../actions";

export const coinsFeatureKey = 'coins';

export interface State extends EntityState<CoinMarketData> {
    isFavorite: boolean[];

}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({ 
    isFavorite: []
});

export const reducer = createReducer(
    initialState,
    on(CoinsListingPageActions.loadCoinMarketsSuccess, (state, { data, isFavorite }) => {
        return {
            ...adapter.setAll(data, state),
            isFavorite
        }
    })
)