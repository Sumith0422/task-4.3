import { ITodo } from './../models/servey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  Url = 'http://localhost:8080/tasks/';

  constructor(private http: HttpClient) {}


  // get all user from api
  getUsers(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.Url}`);
  }

  // post data to api
  Post(obj: any) {
    return this.http.post<any>(`${this.Url}`, obj);
  }

  // update data
  updateUser(id: number, obj: any) {
    return this.http.put<ITodo>(`${this.Url}` + id, obj);
  }

  // delete data
  delete(id: number) {
    return this.http.delete<ITodo>(this.Url + id);
  }
}
