import { Component, Injectable, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../models/user.model';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  
  usersList:User[]=[];

constructor(public usersService:UsersService){}

ngOnInit(): void {
this.usersService.getUsers().subscribe(res=>this.usersList=res);
}

onLogin(form:NgForm){
this.usersService.logIn(form);
form.reset();
}





}
