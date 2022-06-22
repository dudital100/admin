import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChefInterface } from '../interfaces/chef-interface';
import { Observable } from 'rxjs';
import { DeleteResponse } from '../interfaces/delete-response';


@Injectable({
  providedIn: 'root'
})
export class ChefService {

  constructor(private http: HttpClient) { }
  getChefs(): Observable<ChefInterface[]> {
    return this.http.get<ChefInterface[]>('http://localhost:8080/api/v1/chefs/')
  }
  deleteById(id:string) {
    return this.http.delete<DeleteResponse>(`http://localhost:8080/api/v1/chefs/${id}`);
  }
  addChef(chef: ChefInterface) {
      return this.http.post('http://localhost:8080/api/v1/chefs' , chef);
  }
  updateChef(newValues: object , id: string) {
    return this.http.put(`http://localhost:8080/api/v1/chefs/${id}`, newValues);
  }

}
