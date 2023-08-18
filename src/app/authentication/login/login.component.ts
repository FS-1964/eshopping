import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
   loginUserData:any = {}

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }
  submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.loginUserData.username=this.form.get('username')?.value!;
    this.loginUserData.password=this.form.get('password')?.value!;
    this._auth
      .login(this.loginUserData)
      .subscribe((response) => {
        this._router.navigate(['/products']);
      });
  }
}
