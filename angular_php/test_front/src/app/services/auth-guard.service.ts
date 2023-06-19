import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';


@Injectable({providedIn:'root'})
export class AuthGuard {
    constructor(private router:Router, public usersService:UsersService){} 
    
    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                if(this.usersService.activateLogin()){
                    return true;
                }else{
                    return this.router.navigate(['/']);
                }
                   
         } 
    
}