import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7273/api'; // Alterado para base da API

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  constructor(private http: HttpClient) {}

  // Método para pegar todos os assuntos
  getAssuntos(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/assunto`); // Alterado para incluir '/assunto'
  }

  // Método para pegar assunto por ID
  getAssuntoById(codAssunto: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/assunto/${codAssunto}`); // Alterado para incluir '/assunto'
  }

  // Método para criar um novo assunto
  createAssunto(assunto: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/assunto`, assunto); // Alterado para incluir '/assunto'
  }

  // Método para atualizar um assunto existente
  updateAssunto(codAssunto: number, assunto: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/assunto/${codAssunto}`, assunto); // Alterado para incluir '/assunto'
  }

  // Método para excluir um assunto
  deleteAssunto(codAssunto: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/assunto/${codAssunto}`); // Alterado para incluir '/assunto'
  }
}
