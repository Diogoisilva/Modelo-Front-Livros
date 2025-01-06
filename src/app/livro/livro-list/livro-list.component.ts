import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [LivroService]
})
export class LivroListComponent implements OnInit {
  livros: any[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.livroService.getLivros().subscribe((data) => {
      this.livros = data;
    }, (error) => {
      console.error('Erro ao carregar a lista de livros:', error);
    });
  }

  deleteLivro(codl: number): void {
    this.livroService.deleteLivro(codl).subscribe(() => {
      this.livros = this.livros.filter(livro => livro.codl !== codl);
    }, (error) => {
      console.error('Erro ao deletar o livro:', error);
    });
  }
}
