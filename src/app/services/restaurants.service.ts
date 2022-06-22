import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantInterface } from '../interfaces/restaurant-interface';
import { Observable } from 'rxjs';
import { DeleteRestaurant } from '../interfaces/delete-restaurant';


@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}
  getRestaurants(): Observable<RestaurantInterface[]> {
    return this.http.get<RestaurantInterface[]>('http://localhost:8080/api/v1/restaurants')
  }
  deleteById(id:string) {
    return this.http.delete<DeleteRestaurant>(`http://localhost:8080/api/v1/restaurants/${id}`);
  }
  addRestaurant(newRest: RestaurantInterface) {
    return this.http.post('http://localhost:8080/api/v1/restaurants' , newRest);
  }
  updateRestaurant(updatedRest: RestaurantInterface, id: string) {
    return this.http.put(`http://localhost:8080/api/v1/restaurants/${id}`, updatedRest);
  }
}
