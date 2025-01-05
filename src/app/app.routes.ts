import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
];
