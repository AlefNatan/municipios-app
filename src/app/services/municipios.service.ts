import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Municipio } from '../models/municipio.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private readonly apiUrl = `${environment.apiUrl}/municipios`;

  constructor(private http: HttpClient) {}

  getMunicipiosByEstado(estado: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/${estado}`);
  }
}

