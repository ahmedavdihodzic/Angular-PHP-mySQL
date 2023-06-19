import { Component, Injectable, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

@Injectable()
export class WelcomeComponent implements OnInit {
  
  constructor( public usersService:UsersService,
               private router:Router,
               private route:ActivatedRoute,){}

  usersList:User[]=[];

  ngOnInit(): void {
   this.usersList=this.route.snapshot.data['user'];
  //this.usersService.getUsers().subscribe(res=>this.usersList=res);
  }

  onDelete(u_id:any){
   this.usersService.deleteUser(u_id).subscribe(res=>{
    console.log(res);
    this.ngOnInit();
  });
  
   }

    logOut(){
      this.usersService.logOut();
      this.router.navigate(['/login']);
     }
  

  
}
