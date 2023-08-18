import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit{
  requesteduser: user = {
    id:'',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    address: '',
    role: '',
    password: '',
    createdAt: '',
    modifiedAt:'',
    token: ''
  };
  constructor(private userservice: UserService,  private route: Router) { }
  ngOnInit(): void {}
  addUser() {
   
    this.userservice.addUser(this.requesteduser).subscribe({
      next: (user) => {   this.route.navigate(['users']) },
      error: (response: any) => { console.log(response) }
    });
  
  }
}
