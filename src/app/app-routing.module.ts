import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers';

export const routes: Routes = [
  { path: '', redirectTo: '/coins', pathMatch: 'full' },
  // {
  //   path:'auth',
  //   loadChildren: () =>
  //     import('./authorization/auth.module').then((m) => m.AuthModule)
  // },
  {
    path: 'coins',
    loadChildren: () =>
      import('./coins/coins.module').then((m) => m.CoinsModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
