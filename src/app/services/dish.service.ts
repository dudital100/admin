import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishInterface } from '../interfaces/dish-interface';
import { Observable } from 'rxjs';
import { DeleteResponse } from '../interfaces/delete-response';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }
  getDishes(): Observable<DishInterface[]> {
    return this.http.get<DishInterface[]>('http://localhost:8080/api/v1/dishes');
  }
  deleteById(id:string) {
    return this.http.delete<DeleteResponse>(`http://localhost:8080/api/v1/dishes/${id}`);
  }
  addDish(newDish: DishInterface) {
    console.log(newDish);
    return this.http.post('http://localhost:8080/api/v1/dishes' , newDish);
  }
  updateDish( updatedDish: DishInterface, id: string) {
    return this.http.put(`http://localhost:8080/api/v1/dishes/${id}` , updatedDish);
  }
  getfilteredDishes(filter: object) {
    return this.http.post<DishInterface[]>('http://localhost:8080/api/v1/dishes/filter' , filter);
  }
}