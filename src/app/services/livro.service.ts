import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Livro } from '../livro/livro.model'; // Certifique-se de que o modelo Livro está no caminho correto
import { catchError } from 'rxjs/operators';

const API_URL = 'https://localhost:7273/api'; // Alterado para base da API

@Injectable({
  providedIn: 'root',
})
export class LivroService {

  constructor(private http: HttpClient) {}

  // Método para pegar todos os livros
  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${API_URL}/livro`).pipe( // Alterado para incluir '/livro'
      catchError((error) => {
        console.error('Erro ao buscar livros:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  getLivroById(id: number): Observable<Livro | null> {
    return this.http.get<Livro>(`${API_URL}/livro/${id}`).pipe( // Alterado para incluir '/livro'
      catchError(() => of(null as Livro | null)) // Ajustado para permitir 'null' como retorno
    );
  }

  updateLivro(id: number, livro: Livro): Observable<Livro | null> {
    return this.http.put<Livro>(`${API_URL}/livro/${id}`, livro).pipe( // Alterado para incluir '/livro'
      catchError(() => of(null as Livro | null)) // Ajustado para permitir 'null' como retorno
    );
  }

  createLivro(livro: Livro): Observable<Livro | null> {
    return this.http.post<Livro>(`${API_URL}/livro`, livro).pipe( // Alterado para incluir '/livro'
      catchError(() => of(null as Livro | null)) // Ajustado para permitir 'null' como retorno
    );
  }

  // Método para excluir um livro
  deleteLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/livro/${id}`).pipe( // Alterado para incluir '/livro'
      catchError((error) => {
        console.error('Erro ao excluir livro:', error);
        return of(); // Retorna void (sem valor) em caso de erro
      })
    );
  }
}
