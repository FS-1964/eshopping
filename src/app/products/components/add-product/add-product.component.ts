import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductrequest: product = {
    title: '',
    description: '',

    price: '',
    image: '',
  quantity:0,
    productId: ''
  };
  modelchanged: boolean = false;
  selectedItem: any;
  myform: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService, private route: Router) {
    this.myform = fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      productImg: ['', Validators.required],
      price: ['', Validators.required]
    })
  }
  ngOnInit(): void {

  }

  addProduct() {
    console.log(this.addProductrequest)

    this.productService.addProduct(this.addProductrequest).subscribe({
      next: (product) => { this.route.navigate(['products']); },
      error: err => {

        (response: any) => {}
      }
    })
    this.modelchanged = false;
  }
  onChange(newValue: any) {

    this.selectedItem = newValue;
    this.modelchanged = true;

  }
}
