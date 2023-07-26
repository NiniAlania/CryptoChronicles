import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoinMarketData } from "../models";
import { createReducer, on } from "@ngrx/store";
import { CoinsApiActions } from "../actions";

export const coinsFeatureKey = 'coins';

export interface State extends EntityState<CoinMarketData> {

}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
    initialState,
    on(CoinsApiActions.loadCoinMarketsSuccess, (state, { data }) => adapter.addMany(data, state))
)