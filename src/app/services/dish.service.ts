import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishInterface } from '../interfaces/dish-interface';
import { Observable } from 'rxjs';
import { DeleteResponse } from '../interfaces/delete-response';
import { BaseUrlService } from '../services/base-url.service'

@Injectable({
  providedIn: 'root'
})
export class DishService {
  baseUrl:string;
  
  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }
  getDishes(): Observable<DishInterface[]> {    
    return this.http.get<DishInterface[]>(`${this.baseUrl}api/v1/dishes`);
  }
  deleteById(id:string) {
    return this.http.delete<DeleteResponse>(`${this.baseUrl}api/v1/dishes/${id}`);
  }
  addDish(newDish: DishInterface) {
    // console.log(newDish);
    return this.http.post(`${this.baseUrl}api/v1/dishes` , newDish);
  }
  updateDish( updatedDish: DishInterface, id: string) {
    return this.http.put(`${this.baseUrl}api/v1/dishes/${id}` , updatedDish);
  }
  getfilteredDishes(filter: object) {
    return this.http.post<DishInterface[]>(`${this.baseUrl}api/v1/dishes/filter` , filter);
  }
}