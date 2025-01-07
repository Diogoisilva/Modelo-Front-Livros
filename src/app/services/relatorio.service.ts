import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatorioLivro } from '../relatorio-livros/relatorio-livro.model';


const API_URL = 'https://localhost:7273/api/Relatorio/relatoriolivros'; // Alterado para base da API


@Injectable({
  providedIn: 'root',
})
export class RelatorioService {

  constructor(private http: HttpClient) {}

  getRelatorioLivros(): Observable<RelatorioLivro[]> {
    return this.http.get<RelatorioLivro[]>(API_URL);
  }
}
