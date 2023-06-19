import {HttpClient} from '@angular/common/http';
import {Get} from '../models/get.model';
import {map} from 'rxjs/operators';
import {Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({providedIn:'root'})

export class UsersService{
constructor(private http:HttpClient,
            private router:Router){}

usersList:User[]=[];
user:User[]=[];
login:boolean=false;

activateLogin(){
    return this.login;
}

getUser(id:any){
 return this.http.get<Get>('http://localhost/angular_php/test_back/index.php/api/user/')
            .pipe(map((res:any)=>{ 
                for(let i=0;i<res.data.length;i++){
                   if(res.data[i].u_id==id) this.user=res.data[i];      
                }       
                return this.user;        
 }));
}

getUsers(){
return this.http.get<Get>('http://localhost/angular_php/test_back/index.php/api/user/')
.pipe(map((res:any)=>{
    this.usersList=res.data;
    return this.usersList;
 }));
}

insertUser(formData:NgForm){  
this.http.post<User>('http://localhost/angular_php/test_back/index.php/api/user/',formData)
         .subscribe(res=>console.log(res));
}

updateUser(formData:NgForm){
    this.http.put<User>('http://localhost/angular_php/test_back/index.php/api/user/',formData)
               .subscribe(res=>console.log(res));          
}

deleteUser(u_id:any){
   return this.http.delete('http://localhost/angular_php/test_back/index.php/api/user/'+u_id);
}

logIn(form:any){

    let username:String=form.value.u_username;
    let password:String=form.value.u_password;

 for(let i=0;i<this.usersList.length;i++){   
         let usernameDb:String = this.usersList[i].u_username;
         let passwordDb:String = this.usersList[i].u_password;
         if(username==usernameDb&&password==passwordDb) 
         {this.login=true;}
         } 
         if(this.login){this.router.navigate(['/welcome']);}
          else {alert('NO such user!');}
}

logOut(){
    this.login=false;
}


}