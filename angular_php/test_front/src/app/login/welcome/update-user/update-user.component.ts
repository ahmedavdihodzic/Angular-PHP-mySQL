import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from '../../../models/user.model';
import { UsersService } from 'src/app/services/users.service';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

@Injectable()
export class UpdateUserComponent implements OnInit{
  constructor( private usersService:UsersService,
               private route:ActivatedRoute,
               private router:Router){}

id:Number=this.route.snapshot.params['id'];
usersList:User[]=[];
user:any;

ngOnInit(): void {
  this.usersService.getUsers().subscribe(res=>this.usersList=res);
  this.usersService.getUser(this.id).subscribe(res=>this.user=res);
}

onUpdate(form:NgForm){

  var data:any ={
    "u_id":this.id,
    "u_name":form.value.u_name,
    "u_lastname":form.value.u_lastname,
    "u_address":form.value.u_address,
    "u_username":this.user.u_username,
    "u_postnumber":form.value.u_postnumber,
    "u_city":form.value.u_city,
    "u_password":form.value.u_password2,
  }
 
  console.log(this.user);
 
  if(!form.value.u_name||!form.value.u_lastname||!form.value.u_address||!form.value.u_postnumber||!form.value.u_city||!form.value.u_password2){
    alert("All fields are needed!");
  }else if(form.value.u_password1!==form.value.u_password2){
    alert("Error password repeat!")
  } else  if(form.value.u_oldpassword!==this.user.u_password) {
    alert("Wrong password")
  } 
  else{
  this.usersService.updateUser(data);
  form.reset();
  alert("Success!")
  this.router.navigate(['/welcome']);
}
}


}
