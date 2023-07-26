import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoinsListingPageComponent, FavoriteCoinsListingPageComponent, SearchCoinsPageComponent } from "./containers";

const routes: Routes = [
    {
        path: '',
        component: CoinsListingPageComponent,
        data: { title: 'Coins Listing' },
    },
    {
        path: 'favorites',
        component: FavoriteCoinsListingPageComponent,
        data: { title: 'Favorite Coins Listing' },
    },
    {
        path: 'search',
        component: SearchCoinsPageComponent,
        data: { title: 'Search Coins'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CoinsRoutingModule {}