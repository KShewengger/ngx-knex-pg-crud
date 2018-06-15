import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import { Account } from "../../../../../shared/interfaces/-index";

import { UserService } from "./user.service";


@Injectable()
export class UserListResolver implements Resolve<Account[]> {
  
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.userService.fetchAllUsers();
  }
  
}

@Injectable()
export class UserResolver implements Resolve<Account> {
  
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params.id;
    
    return this.userService.fetchUser(id);
  }
  
}
