import { createReducer, on } from "@ngrx/store";
import { CoinsListingPageActions, FavoritesListingPageActions } from "../actions";

export const pageFeatureKey = 'page';

export interface State {
    pageSize: number
}

export const initialState: State = {
    pageSize: 100
}

export const reducer = createReducer(
    initialState,
    on(
        CoinsListingPageActions.pageSizeChanged, 
        FavoritesListingPageActions.pageSizeChanged,
        (state, { pageSize }) => ({pageSize})    
    )
)