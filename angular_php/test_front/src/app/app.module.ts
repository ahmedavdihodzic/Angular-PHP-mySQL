import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './login/welcome/welcome.component';
import { UpdateUserComponent } from './login/welcome/update-user/update-user.component';
import { AddUserComponent } from './login/welcome/add-user/add-user.component';
import { AuthGuard } from './services/auth-guard.service';
import { ServerResolver } from './services/server-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    UpdateUserComponent,
    AddUserComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
