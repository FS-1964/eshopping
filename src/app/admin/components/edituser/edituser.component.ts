import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit{
  userDetails: user = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    address: '',
    role:'',
    password:'',
    createdAt:'',
    modifiedAt:'',
    token:''
  };
  selectedItem:any;
  modelchanged:boolean=false;
  constructor(private router: Router, private route: ActivatedRoute, private userservice: UserService) {}

  ngOnInit(): void {
   
    this.route.paramMap.subscribe({
      next: (params) => {
     
        const uid = params.get('Id');
      
        if (uid) { 
          this.userservice.getUser(uid).subscribe({
            next: (response) => { 
              this.userDetails = response;
             
            }
          });
        }
      }
    });
  }
deleteUser(id: string) {
  this.userservice.deleteUser(this.userDetails.id).subscribe({
    next: (response) => { this.router.navigate(['admin/users']) }
  });
}
updateUser() {alert("edit");
  this.userservice.updateUser(this.userDetails.id.toString(), this.userDetails).subscribe({
    next: (response) => { this.router.navigate(['admin/users']) }
  });
  this.modelchanged=false;
}
onChange(newValue:any) {
 
  this.selectedItem = newValue;  // don't forget to update the model here
  this.modelchanged=true;

  // ... do other stuff here ...
}

}
