import { Component, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

@Injectable()
export class AddUserComponent {

  constructor(private usersService:UsersService,
              private router:Router){}

  onAdd(form:NgForm){
    console.log(form.value);
    var formData:any = new FormData();
    formData.append('u_name',form.value.u_name);
    formData.append('u_lastname',form.value.u_lastname);
    formData.append('u_address',form.value.u_address);
    formData.append('u_username',form.value.u_username);
    formData.append('u_postnumber',form.value.u_postnumber);
    formData.append('u_city',form.value.u_city);
    formData.append('u_password',form.value.u_password);
    

    if(!form.value.u_name||!form.value.u_lastname||!form.value.u_address||!form.value.u_username||!form.value.u_postnumber||!form.value.u_city||!form.value.u_password){
      alert("All fields are needed!");
    }
    else{ 
    this.usersService.insertUser(JSON.parse(JSON.stringify(formData)));
    form.reset();
    this.router.navigate(['/welcome']);
    }
    
  }

}
