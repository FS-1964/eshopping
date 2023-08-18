import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  public users: any = []
  constructor(private userservice: UserService) { }
  ngOnInit(): void {
    this.userservice.getUsers().subscribe(res => {
      // console.log(res);
      this.users = res
    })
  }

}
