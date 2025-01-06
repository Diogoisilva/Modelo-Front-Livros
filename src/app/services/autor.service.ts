import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7273/api/autor';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private http: HttpClient) {}

  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  getAutorById(codAu: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${codAu}`);
  }

  createAutor(autor: any): Observable<any> {
    return this.http.post<any>(API_URL, autor);
  }

  updateAutor(codAu: number, autor: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${codAu}`, autor);
  }

  deleteAutor(codAu: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${codAu}`);
  }
}
