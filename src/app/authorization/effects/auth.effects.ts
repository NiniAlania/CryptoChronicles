import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs";
import { AuthPageActions } from "../actions";
import { AuthService } from "../services";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.logIn),
            mergeMap(({data}) =>  { 
               return this.authService.login(data).pipe(
                map((user) => {
                    return AuthPageActions.authSuccess({user});

                })
               )
            })
        )
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.signUp),
            mergeMap(({data}) => {
                return this.authService.register(data).pipe(
                    map((user) => {
                        console.log(user)
                        return AuthPageActions.authSuccess({user});
                    })
                )
             })
        )
    })


    constructor(private actions$: Actions, private authService: AuthService) {}
}