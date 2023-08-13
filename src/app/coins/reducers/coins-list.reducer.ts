import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoinsListingPageActions } from "../actions";
import { Coin, CoinMarketData } from "../models";
import { DrawerActions } from "src/app/core/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

export const coinsListFeatureKey = 'coinsList';

export interface State extends EntityState<Coin> {
    loading: boolean;
    error: boolean;
}

export const adapter: EntityAdapter<Coin> = createEntityAdapter<Coin>({
    selectId: (coin: Coin) => coin.id,
    sortComparer: false,
})

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: false
})

export const reducer = createReducer(
    initialState,
    on(
        CoinsListingPageActions.loadCoinListSuccess, 
        (state, {data}) => ({
            ...adapter.setAll(data, state),
            loading: false,
            error: false
        })
    ),
    on(
        CoinsListingPageActions.loadCoinListFail,
        (state) => ({
            ...adapter.setAll([], state),
            error: true

        })
    ),
    on(
        CoinsListingPageActions.enter, 
        DrawerActions.changeCurrency, 
        routerNavigatedAction, 
        CoinsListingPageActions.pageSizeChanged,
        (state) => ({
            ...state,
            loading: true,
            error: false
        })
    )
)


