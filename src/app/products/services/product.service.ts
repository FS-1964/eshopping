import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<product[]> {
    const productUrl = 'https://localhost:7203/api/Product';
   return this.httpClient.get<product[]>(productUrl);
 }
 addProduct(addProductrequest: product): Observable<product> {
  addProductrequest.productId = '00000000-0000-0000-0000-000000000000';
  return this.httpClient.post<product>('https://localhost:7203/api/Product/add', addProductrequest);

}
getProduct(id: string): Observable<product> {
  return this.httpClient.get<product>( 'https://localhost:7203/api/Product/' + id);
}

updateProduct(id: string, productDetails: product): Observable<product> {
  return this.httpClient.put<product>('https://localhost:7203/api/Product/updateproduct/' + id, productDetails);
}
deleteProduct(id: string): Observable<product> {
  return this.httpClient.delete<product>( 'https://localhost:7203/api/Product/deleteproduct/' + id);
}
}
