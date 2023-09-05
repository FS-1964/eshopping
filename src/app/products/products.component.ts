import { Component, OnInit } from '@angular/core';
import { product } from '../models/product';
import { ProductService } from './services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './services/cart.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

 

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private cartService : CartService) { }
  products!: any[];
  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      this.products.forEach((a: any) => {
        Object.assign(a, { quantity: 0, total: a.price })
      });

    });
  }

  addToCart(item: any) {
    console.log('addtocart')
    this.cartService.addtoCart(item);

  }

   
 
}
