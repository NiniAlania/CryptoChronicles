import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './containers/auth-page/auth-page.component';


const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    data: { title: 'Authorization'}
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
 }
