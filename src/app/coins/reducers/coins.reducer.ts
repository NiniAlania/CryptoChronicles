import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoinMarketData } from "../models";
import { createReducer, on } from "@ngrx/store";
import { CoinsApiActions } from "../actions";

export const coinsFeatureKey = 'coins';

export interface State extends EntityState<CoinMarketData> {
    page: number,
    pageSize: number
}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({ 
    page: 1, 
    pageSize: 100
});

export const reducer = createReducer(
    initialState,
    on(CoinsApiActions.loadCoinMarketsSuccess, (state, { data, page, pageSize }) => {
        return {
            ...adapter.setAll(data, state), 
            page,
            pageSize
        }
    })
)