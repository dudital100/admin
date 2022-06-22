import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor() { }
  isLoggedIn(): boolean {
    if(localStorage.getItem('email'))
      return true
    else return false
  }
}
