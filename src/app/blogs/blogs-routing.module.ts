import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BlogPageComponent, BlogsPageComponent } from "./containers";

const routes: Routes = [
    {
        path: '',
        component: BlogsPageComponent,
        data: { title: 'Blogs'}
    },
    {
        path: ':id',
        component: BlogPageComponent,
        data: { title: 'Blog Post'}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogsRoutingModule {}