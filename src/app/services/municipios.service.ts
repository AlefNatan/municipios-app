import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Municipio } from '../models/municipio.interface';

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private readonly apiUrl = `${environment.apiUrl}/Municipios`;

  constructor(private http: HttpClient) {}

  getMunicipios(uf: string, page: number, pageSize: number): Observable<PaginatedResponse<Municipio>> {
    return this.http.get<PaginatedResponse<Municipio>>(
      `${this.apiUrl}/${uf}?page=${page}&pageSize=${pageSize}`
    );
  }
}
