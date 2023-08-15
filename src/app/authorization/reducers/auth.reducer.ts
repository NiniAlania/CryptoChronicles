import { createReducer, on } from "@ngrx/store";
import { AuthPageActions } from "../actions";
import { User } from "../models";

export const authFeatureKey = 'authUser';

export interface State {
    user: User | null
    loading: boolean | null
    error: string | null
}

export const initialState: State = {
    user: null,
    loading: false,
    error: null
}

export const reducer = createReducer(
    initialState,
    on(
        AuthPageActions.authSuccess, 
        (state, {user}) => ({
            ...state, 
            user,
            loading: false,
            error: null
        })
    ),
    on(
        AuthPageActions.logIn, 
        AuthPageActions.signUp, 
        (state) => ({
            ...state,
            loading: true,
            error: null
        })
    ),
    on(
        AuthPageActions.authFailed,
        (state, {error}) => ({
            ...state,
            user: null,
            loading: false,
            error
        })
    ),
    on(
        AuthPageActions.clearError,
        (state) => ({
            ...state,
            error: null
        })
    ),
    on(AuthPageActions.logout,
        (state) => ({
            ...state,
            user: null,
            loading: false,
            error: null
        }))
)

