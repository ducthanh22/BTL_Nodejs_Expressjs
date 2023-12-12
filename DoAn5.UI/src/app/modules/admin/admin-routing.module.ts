import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';





const routes: Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'categories_admin',component:CategoriesComponent},
    {path:'products_admin',component:ProductsComponent},

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
