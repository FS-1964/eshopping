import { Component, OnInit } from '@angular/core';
import { product } from '../models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService){}
  products!: any[];
  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      /* this.products.forEach((a:any) => {
        
        Object.assign(a,{quantity:1,total:a.price});
      }); */

    });
  }
}
