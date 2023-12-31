import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { map, tap } from 'rxjs/operators';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import * as fromRoot from '../../reducers';
import { HeaderService } from '../services';

@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => this.store.select(fromRoot.selectRouteData)),
        map(([, data]) => data['title']),
        tap((title) => this.headerService.setTitle(title)),
        map((title) => `Crypto Chronicles - ${title}`),
        tap((title) => this.titleService.setTitle(title)),
        
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private titleService: Title,
    private headerService: HeaderService
  ) {}
}
