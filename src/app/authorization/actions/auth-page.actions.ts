import { createAction, props } from "@ngrx/store";
import { LoginData, SignUpData, User } from "../models";


export const logIn = createAction(
    '[Auth Page] login',
    props<{data: LoginData}>()
)

export const signUp = createAction(
    '[Auth Page] signup',
    props<{data: SignUpData}>()
)

export const authSuccess = createAction(
    '[Auth Page] auth success',
    props<{user: User | null, redirect: boolean}>()
)

export const authFailed = createAction(
    '[Auth Page] login failed',
    props<{error: string | null}>()
)

export const clearError = createAction(
    '[Auth Page] clear error'
)

export const logout = createAction(
    '[Auth Page] logout'
)

export const autoLogin = createAction(
    '[Auth Page] auto login' 
)
