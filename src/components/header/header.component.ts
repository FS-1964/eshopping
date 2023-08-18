import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged: any;
  constructor(private authservice: AuthService) { }
  ngOnInit(): void {


  }
  logoutactiv() {
    console.log(this.authservice.User); console.log(this.authservice.token)
    this.authservice.ProceedLogout();
  }
  isloggedin() {
    let result = false;
    if (this.authservice.token) {
      result = true;
    }
    console.log(result)
    return result;
  }
}
