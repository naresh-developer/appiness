import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent} from 'src/app/login/login.component'
import { ProductComponent } from 'src/app/product/product.component'
import {CategoryComponent} from 'src/app/category/category.component'

import { AuthGuard } from 'src/app/_helper/auth.gaurd'



const routes: Routes = [   
{
  path: '',
  component: ProductComponent,
  canActivate: [AuthGuard]
},
{
  path: 'category',
  component: CategoryComponent,
  canActivate: [AuthGuard],
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
