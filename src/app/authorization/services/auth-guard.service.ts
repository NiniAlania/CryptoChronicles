import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, take } from "rxjs";
import { selectUser } from "../reducers";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
        return this.store.select(selectUser).pipe(
            take(1),
            map((user) => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(["/auth"]);
            })
        );
    }
}