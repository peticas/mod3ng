import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, isEmpty } from 'rxjs';
import { IEstudiante } from '../components/models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:3000/estudiantes';

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(this.urlApi);
  }

  getEstudiante(id: string): Observable<IEstudiante> {
    return this.http.get<IEstudiante>(this.urlApi);
  }

  createEstudiante(estudiante: IEstudiante): Observable<any> {
    return this.http.post(this.urlApi, estudiante);
  }

  updateEstudiante(id: string, estudiante: IEstudiante) {
    return this.http.put(`${this.urlApi}${id}`, estudiante);
  }

  deleteEstudiante(id: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
