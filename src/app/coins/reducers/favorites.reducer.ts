import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { FavoritesListingPageActions } from "../actions";
import { CoinMarketData } from "../models";

export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<CoinMarketData> {
}

export const adapter: EntityAdapter<CoinMarketData> = createEntityAdapter<CoinMarketData>({
    selectId: (coinMarketData: CoinMarketData) => coinMarketData.id,
    sortComparer: false,
});


export const initialState: State = adapter.getInitialState({ 
});


export const reducer = createReducer(
    initialState,
    on(FavoritesListingPageActions.loadFavoritesSuccess,
        (state, {data}) => adapter.setAll(data, state))
);
