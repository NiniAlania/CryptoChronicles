import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoinsListingPageComponent, FavoriteCoinsListingPageComponent, SearchCoinsPageComponent } from "./containers";
import { CoinPageComponent } from "./containers/coin-page/coin-page.component";
import { AuthGuard } from "../authorization/services/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        component: CoinsListingPageComponent,
        data: { title: 'Coins Listing' },  
    },
    {
        path: 'favorites',
        component: FavoriteCoinsListingPageComponent,
        canActivate: [AuthGuard],
        data: { title: 'Favorite Coins Listing' },
    },
    {
        path: 'search',
        component: SearchCoinsPageComponent,
        data: { title: 'Search Coins'}
    },
    {
        path: ':id',
        component: CoinPageComponent,
        data: {title: 'Coin Details'},
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CoinsRoutingModule {}