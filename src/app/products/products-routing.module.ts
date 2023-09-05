import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { CartComponent } from './components/cart/cart.component';



const routes: Routes = [{ path: '', component: ProductsComponent },
{ path: 'update-product/:id', component:UpdateProductComponent },
{ path: 'add-product', component:AddProductComponent },
{path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
