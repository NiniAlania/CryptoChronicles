import { createReducer, on } from "@ngrx/store";
import { AuthPageActions } from "../actions";
import { User } from "../models";

export const authFeatureKey = 'authUser';

export interface State {
    user: User | null
}

export const initialState: State = {
    user: null
}

export const reducer = createReducer(
    initialState,
    on(AuthPageActions.authSuccess, (state, {user}) => ({...state, user}))
)