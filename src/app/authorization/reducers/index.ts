import * as fromAuth from './auth.reducer'
import * as fromRoot from '../../reducers'
import { Action, combineReducers, createFeature, createFeatureSelector, createSelector } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AuthState {
    [fromAuth.authFeatureKey]: fromAuth.State
}

export interface State extends fromRoot.State {
    [authFeatureKey]: AuthState
}


export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({
        [fromAuth.authFeatureKey]: fromAuth.reducer
    })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUserState = createSelector(
    selectAuthState,
    (state) => state.authUser
)

export const selectUser = createSelector(
    selectAuthUserState,
    (state) => state.user
)

export const selectLoading = createSelector(
    selectAuthUserState,
    (state) => state.loading
)

export const selectError = createSelector(
    selectAuthUserState,
    (state) => state.error
)