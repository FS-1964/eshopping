import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: product[] = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  private _cartItemsCount= new BehaviorSubject<number>(0);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  } 
  getItemsCount() {
    return this._cartItemsCount.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    let counterVal = this._cartItemsCount.value;
    this._cartItemsCount.next(counterVal + 1);
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id && a.quantity > 0) {
        a.quantity++;

      }
    })

    if (product.quantity === 0) {
      product.quantity += 1;
      this.cartItemList.push(product);
    }

    this.productList.next(this.cartItemList);
    this.getTotalPrice();

  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      a.total = a.quantity * a.price;
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    let counterVal = this._cartItemsCount.value;
    this._cartItemsCount.next(counterVal - 1);
    console.log(this.cartItemList)
    this.cartItemList.map((a: any, index: any) => {

      if (product.id === a.id && a.quantity > 0) {
        a.quantity--;
        if (product.quantity === 0) {
          this.cartItemList.splice(index, 1);
        }
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
