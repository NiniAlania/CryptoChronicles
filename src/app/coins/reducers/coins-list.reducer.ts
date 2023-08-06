import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoinsListingPageActions } from "../actions";
import { Coin, CoinMarketData } from "../models";

export const coinsListFeatureKey = 'coinsList';

export interface State extends EntityState<Coin> {}

export const adapter: EntityAdapter<Coin> = createEntityAdapter<Coin>({
    selectId: (coin: Coin) => coin.id,
    sortComparer: false,
})

export const initialState: State = adapter.getInitialState({

})

export const reducer = createReducer(
    initialState,
    on(CoinsListingPageActions.loadCoinListSuccess, (state, {data}) => adapter.setAll(data, state))
)


