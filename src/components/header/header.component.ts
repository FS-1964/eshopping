import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { CartService } from 'src/app/products/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged: any;
  public totalItem : number = 0;
  constructor(private authservice: AuthService, private cartService : CartService) { }
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    
  }
  logoutactiv() {
    this.authservice.ProceedLogout();
  }
  isloggedin() {
    let result = false;
    if (this.authservice.token) {
      result = true;
    }
    return result;
  }
}
