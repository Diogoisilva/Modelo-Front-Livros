import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7273/api/assunto';

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  constructor(private http: HttpClient) {}

  getAssuntos(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  getAssuntoById(codAssunto: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${codAssunto}`);
  }

  createAssunto(assunto: any): Observable<any> {
    return this.http.post<any>(API_URL, assunto);
  }

  updateAssunto(codAssunto: number, assunto: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${codAssunto}`, assunto);
  }

  deleteAssunto(codAssunto: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${codAssunto}`);
  }
}
