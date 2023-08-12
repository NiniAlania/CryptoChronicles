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
    '[Auth Page] Auth Success',
    props<{user: User | null}>()
)