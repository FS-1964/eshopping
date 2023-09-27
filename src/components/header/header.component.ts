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

  loggeduser: string | undefined="";
  public totalItemsCount: number = 0;
  constructor(private authservice: AuthService, private cartService: CartService) {
    this.loggeduser = this.authservice.token_userName;
   }
 
  ngOnInit(): void {
  
    this.loggeduser="";
    this.cartService.getItemsCount().subscribe(res => {
      this.totalItemsCount = res;
      this.loggeduser = this.authservice.token_userName;
     // this.loggeduser = this.authservice.getActualUser();
     // console.log("header1"+this.authservice.getActualUser());
    })
    /*   this.loggeduser = this.authservice.getActualUser();
      console.log("header1"+this.authservice.getActualUser());
      console.log("header2"+this.loggeduser); */
  /*   if(this.loggeduser===undefined)
    {
      this.authservice.getLoggedUser().subscribe(res =>{
       
        this.loggeduser= res;
      }) 
    } */
     
     
     
  }
  logoutactiv() {
    this.authservice.ProceedLogout();
    this.loggeduser="";
  }
  isloggedin() {
    let result = false;
  
    if (this.authservice.token) {
      result = true;
    }
    return result;
  }
  isAdmin() {
    let result = false;
    if (this.authservice.HaveAccess() === true) {
      result = true;
    }
    else {
      result = false;
    }
    return result;
  }
}
