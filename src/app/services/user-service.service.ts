import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseUrlService } from '../services/base-url.service';


@Injectable({ providedIn: 'root' })
export class UserServiceService {
  baseUrl: string;
  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }

  login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}api/v1/auth/login`, {
          email,
          password,
        })

    // } catch (error: any) {
    //   return error
    // }
    

  }

  // register(name: string, email: string, password: string): Promise<any> {
  //   try {
  //     return firstValueFrom(
  //       this.http.post<any>(`${this.baseUrl}api/v1/auth/register`, {
  //         name,
  //         email,
  //         password,
  //       })
  //     );
  //   } catch (error: any) {
  //     return error
  //   }

  // }
}
