import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { FavoritesListingPageActions } from "../actions";
import { CoinMarketData } from "../models";
import { DrawerActions } from "src/app/core/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<CoinMarketData> {
    loading: boolean;
    error: boolean;
}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});


export const initialState: State = adapter.getInitialState({ 
    loading: false,
    error: false
});


export const reducer = createReducer(
    initialState,
    on(
        FavoritesListingPageActions.loadFavoritesSuccess,
        (state, {data}) => ({
            ...adapter.setAll(data, state),
            loading: false
        })
    ),
    on(
        FavoritesListingPageActions.loadFavoritesFail,
        (state) => ({
            ...adapter.setAll([], state),
            error: true
        })
    ),
    on(
        FavoritesListingPageActions.enter,
        DrawerActions.changeCurrency, 
        routerNavigatedAction, 
        FavoritesListingPageActions.pageSizeChanged,
        (state) => ({
            ...state,
            loading: true,
            error: false
        })
    ),
);
