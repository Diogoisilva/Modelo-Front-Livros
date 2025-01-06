import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7273/api/livro';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private http: HttpClient) {}

  getLivros(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  getLivroById(codLivro: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${codLivro}`);
  }

  createLivro(livro: any): Observable<any> {
    return this.http.post<any>(API_URL, livro);
  }

  updateLivro(codLivro: number, livro: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${codLivro}`, livro);
  }

  deleteLivro(codLivro: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${codLivro}`);
  }
}
