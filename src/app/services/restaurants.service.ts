import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantInterface } from '../interfaces/restaurant-interface';
import { Observable } from 'rxjs';
import { DeleteRestaurant } from '../interfaces/delete-restaurant';
import { BaseUrlService } from '../services/base-url.service';



@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  baseUrl: string;
  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }
  getRestaurants(): Observable<RestaurantInterface[]> {
    return this.http.get<RestaurantInterface[]>(`${this.baseUrl}api/v1/restaurants`)
  }
  deleteById(id:string) {
    return this.http.delete<DeleteRestaurant>(`${this.baseUrl}api/v1/restaurants/${id}`);
  }
  addRestaurant(newRest: RestaurantInterface) {
    return this.http.post(`${this.baseUrl}api/v1/restaurants` , newRest);
  }
  updateRestaurant(updatedRest: RestaurantInterface, id: string) {
    return this.http.put(`${this.baseUrl}api/v1/restaurants/${id}`, updatedRest);
  }
}
