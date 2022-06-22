import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthCheckService } from './auth-check.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    //Your redirect logic/condition. I use this.
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
  //Constructor
  constructor(private router: Router, private authService: AuthCheckService) {}
}
