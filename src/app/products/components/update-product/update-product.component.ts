
 

 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  productDetails: product = {
    productId: '',
    title: '',
    description: '',
   
    price: '',
    image: '',
   
  };
  productid:string|null="";
  productname:string="";
  selectedItem:any;
  modelchanged:boolean=false;
  constructor(private router: Router, private route: ActivatedRoute, private productservice: ProductService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.productid=id;
    
        console.log(id);
        if (id) {
          this.productservice.getProduct(id).subscribe({
            next: (response) => { 
              this.productDetails = response;
              this.productname=this.productDetails.title;
              console.log(this.productDetails);
            }
          });
        }
      }
    });
  }
  updateProduct() {
    this.productservice.updateProduct(this.productid!, this.productDetails).subscribe({
      next: (response) => { this.router.navigate(['products']) }
    });
    this.modelchanged=false;
  }
  deleteProduct() {
    
    this.productservice.deleteProduct(this.productid!).subscribe({
      next: (response) => { this.router.navigate(['products']) },
      error: err => {
         
        (response: any) => { console.log(response) }
      }
      
      
      
    });
  }
  onChange(newValue:any) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    this.modelchanged=true;
  
    // ... do other stuff here ...
}
} 

