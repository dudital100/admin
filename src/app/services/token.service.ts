import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  getAuthToken():string | null {
    return localStorage.getItem('token')
    }
}
