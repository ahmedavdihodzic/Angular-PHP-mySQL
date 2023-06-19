import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { UsersService } from './users.service';
import { Observable, delay, pipe } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class ServerResolver {
    constructor(private usersService:UsersService,private router:Router){}
    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<User[]> | Promise<User> | User {
        return this.usersService.getUsers();
    }

}