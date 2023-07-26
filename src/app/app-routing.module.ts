import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers';

export const routes: Routes = [
  { path: '', redirectTo: '/coins', pathMatch: 'full' },
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
