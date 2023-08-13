import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { CoinMarketData } from "../models";
import { createReducer, on } from "@ngrx/store";
import { CoinsListingPageActions } from "../actions";
import { DrawerActions } from "src/app/core/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

export const coinsFeatureKey = 'coins';

export interface State extends EntityState<CoinMarketData> {
    isFavorite: boolean[];
    loading: boolean;
    error: boolean;
}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({ 
    isFavorite: [],
    loading: false,
    error: false
});

export const reducer = createReducer(
    initialState,
    on(CoinsListingPageActions.loadCoinMarketsSuccess, (state, { data, isFavorite }) => {
        return {
            ...adapter.setAll(data, state),
            isFavorite,
            loading: false
        }
    }),
    on(
        CoinsListingPageActions.loadCoinMarketsFail, 
        (state) => ({
            ...adapter.setAll([], state),
            isFavorite: [],
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