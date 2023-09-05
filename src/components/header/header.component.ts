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

  public totalItemsCount : number = 0;
  constructor(private authservice: AuthService, private cartService : CartService) { }
  ngOnInit(): void {
   
    this.cartService.getItemsCount().subscribe(res=>{
      this.totalItemsCount=res;
      console.log(this.totalItemsCount);
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
