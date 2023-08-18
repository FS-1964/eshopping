import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { AdduserComponent } from './components/adduser/adduser.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{
  path: 'users',
  component: UsersComponent 
},

{
  path: 'edituser/:Id',
  component: EdituserComponent
},
{
  path: 'adduser',
  component: AdduserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
