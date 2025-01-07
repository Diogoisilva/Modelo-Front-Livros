import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7273/api'; // Alterado para base da API

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private http: HttpClient) {}

  // Método para pegar todos os autores
  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/autor`); // Alterado para incluir '/autor'
  }

  // Método para pegar autor por ID
  getAutorById(codAu: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/autor/${codAu}`); // Alterado para incluir '/autor'
  }

  // Método para criar um novo autor
  createAutor(autor: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/autor`, autor); // Alterado para incluir '/autor'
  }

  // Método para atualizar um autor existente
  updateAutor(codAu: number, autor: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/autor/${codAu}`, autor); // Alterado para incluir '/autor'
  }

  // Método para excluir um autor
  deleteAutor(codAu: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/autor/${codAu}`); // Alterado para incluir '/autor'
  }
}
