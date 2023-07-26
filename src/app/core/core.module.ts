import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent, NotFoundPageComponent } from "./containers";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

export const COMPONENTS = [
    DrawerComponent,
    HeaderComponent,
]

export const CONTAINERS = [
    AppComponent,
    NotFoundPageComponent
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [...COMPONENTS, ...CONTAINERS, FooterComponent],
    exports: [...COMPONENTS, ...CONTAINERS],
})
export class CoreModule { }