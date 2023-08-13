import { createReducer, on } from "@ngrx/store";
import { SearchPageActions } from "../actions";
import { Coin, SearchedCoin } from "../models";

export const searchFeatureKey = 'search';

export interface State {
    searchResults: SearchedCoin[]
    loading: boolean;
    error: boolean;
}

export const initialState: State = {
    searchResults: [],
    loading: false,
    error: false
}

export const reducer = createReducer(
    initialState,
    on(
        SearchPageActions.searchSuccess, 
        (state, {data}) => ({
            ...state,
            searchResults: data,
            loading: false
        })
    ),
    on(
        SearchPageActions.searchFail,
        (state) => ({
            ...state,
            searchResults: [],
            error: true
        })
    ),
    on(
        SearchPageActions.clear,
        (state) => ({
            ...state,
            searchResults: [],
            error: false,
            loading: false,
        })
    ),
)