import { NgModule } from '@angular/core';


import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './components/update-product/update-product.component';

 import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';




@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    CartComponent,
   
  ],
  imports: [
  
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
   
  ]
})
export class ProductsModule { }
