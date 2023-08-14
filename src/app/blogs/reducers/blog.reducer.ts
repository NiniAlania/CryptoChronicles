import { createReducer, on } from "@ngrx/store";
import { Blog } from "../models";
import { BlogPageActions } from "../actions";

export const blogFeatureKey = 'blog';

export interface State {
    blog: Blog | null,
    loading: boolean,
    error: boolean
}

export const initialState: State = {
    blog: null,
    loading: false,
    error: false
};

export const reducer = createReducer(
    initialState,
    on(
        BlogPageActions.enter,
        (state) => ({
            ...state,
            loading: true,
            error: false
        })
    ),
    on(
        BlogPageActions.loadBlogSuccess,
        (state, { blog }) => ({
            ...state,
            blog,
            loading: false,
            error: false
        })
    ),
    on(
        BlogPageActions.loadBlogFailure,
        (state) => ({
            ...state,
            loading: false,
            error: true
        })
    )
)