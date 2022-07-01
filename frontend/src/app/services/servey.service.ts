import { ISurvey } from '../models/servey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// const baseURL = 'https://614c8af259e92d00176ad314.mockapi.io/survey';
const baseURL='https://616aa6c516e7120017fa1064.mockapi.io/Survey';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  getById(id: ISurvey): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(survey: ISurvey): Observable<any> {
    return this.httpClient.post(baseURL, survey);
  }

  update(id: ISurvey,survey: ISurvey): Observable<any> {
    return this.httpClient.put(`${baseURL}/${id}`, survey);
  }

  delete(id: ISurvey): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }



}
