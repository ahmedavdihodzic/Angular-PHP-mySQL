import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './login/welcome/welcome.component';
import { AuthGuard } from './services/auth-guard.service';
import { UpdateUserComponent } from './login/welcome/update-user/update-user.component';
import { AddUserComponent } from './login/welcome/add-user/add-user.component';
import { ServerResolver } from './services/server-resolver.service';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'welcome', canActivate:[AuthGuard], component:WelcomeComponent, resolve:{user:ServerResolver}},
  {path:'update/:id',canActivate:[AuthGuard], component:UpdateUserComponent},
  {path:'add',canActivate:[AuthGuard], component:AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
