import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserServiceService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    try {
      return firstValueFrom(
        this.http.post<any>(`http://localhost:8080/api/v1/auth/login`, {
          email,
          password,
        })
      );
    } catch (error: any) {
      return error
    }
    

  }

  register(name: string, email: string, password: string): Promise<any> {
    try {
      return firstValueFrom(
        this.http.post<any>(`http://localhost:8080/api/v1/auth/register`, {
          name,
          email,
          password,
        })
      );
    } catch (error: any) {
      return error
    }

  }
}
