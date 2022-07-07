import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChefInterface } from '../interfaces/chef-interface';
import { Observable } from 'rxjs';
import { DeleteResponse } from '../interfaces/delete-response';
import { BaseUrlService } from '../services/base-url.service';
import { MonthlyChefInterface } from '../interfaces/monthlychef-interface';


@Injectable({
  providedIn: 'root'
})
export class ChefService {
  baseUrl:string;

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { 
    this.baseUrl = baseUrlService.getBaseUrl();
  }
  getChefs(): Observable<ChefInterface[]> {
    return this.http.get<ChefInterface[]>(`${this.baseUrl}api/v1/chefs/`)
  }
  deleteById(id:string) {
    return this.http.delete<DeleteResponse>(`${this.baseUrl}api/v1/chefs/${id}`);
  }
  addChef(chef: ChefInterface) {
      return this.http.post(`${this.baseUrl}api/v1/chefs` , chef);
  }
  updateChef(newValues: object , id: string) {
    return this.http.put(`${this.baseUrl}api/v1/chefs/${id}`, newValues);
  }
  getChefOfTheMonth() {
    return this.http.get<MonthlyChefInterface[]>(`${this.baseUrl}api/v1/chef-of-the-month`);
  }
  updateChefOfTheMonth(id: string) {
    return this.http.put(`${this.baseUrl}api/v1/chef-of-the-month`, {chefOfTheMonthRef: id});
  }
}
