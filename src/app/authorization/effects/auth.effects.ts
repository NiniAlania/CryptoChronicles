import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AuthPageActions } from "../actions";
import { AuthService } from "../services";
import { routerNavigatedAction } from "@ngrx/router-store";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.logIn),
            switchMap(({data}) =>  { 
               return this.authService.login(data).pipe(
                map((user) => {
                    return AuthPageActions.authSuccess({user, redirect: true});
                }),
                catchError((error) => {
                    return of(AuthPageActions.authFailed({error: error.code}));
                })
               )
            })
        )
    });

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.signUp),
            switchMap(({data}) => {
                return this.authService.register(data).pipe(
                    map((user) => {
                        console.log(user)
                        return AuthPageActions.authSuccess({user, redirect: true});
                    }),
                    catchError((error) => {
                        return of(AuthPageActions.authFailed({error: error.code}));
                    })
                )
             })
        )
    });

    authRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.authSuccess),
            tap(({redirect}) => {
                if (redirect) {
                    return this.router.navigate(['/'])
                } else {
                    return of(null);
                }
            })
        )
    }, { dispatch: false});

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.logout),
            tap(() => {
                console.log('alooo');
                this.authService.logout();
                this.router.navigate(['/']);
            })
        )
    }, { dispatch: false });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthPageActions.autoLogin),
            switchMap(() => {
                return this.authService.getUser().pipe(
                    map((user) => {
                        return AuthPageActions.authSuccess({user, redirect: false});
                    }),
                    catchError((error) => {
                        return of(AuthPageActions.authFailed({error: error.code}));
                    })
                )
            })
        )
    })


    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        private router: Router
    ) {}
}