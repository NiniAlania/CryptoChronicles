import { createReducer, on } from "@ngrx/store";
import { SearchPageActions } from "../actions";
import { Coin, SearchedCoin } from "../models";

export const searchFeatureKey = 'search';

export interface State {
    searchResults: SearchedCoin[]
}

export const initialState: State = {
    searchResults: []
}

export const reducer = createReducer(
    initialState,
    on(SearchPageActions.searchSuccess, (state, {data}) => ({searchResults: data}))
)