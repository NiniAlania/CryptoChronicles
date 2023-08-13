import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NoDataComponent } from './no-data/no-data.component';



@NgModule({
  declarations: [
    PaginatorComponent,
    AlertComponent,
    SpinnerComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: 
  [PaginatorComponent, AlertComponent, SpinnerComponent, NoDataComponent]
})
export class SharedModule { }
