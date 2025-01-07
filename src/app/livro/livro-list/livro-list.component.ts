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
    this.livroService.getLivros().subscribe(
      (data) => {
        console.log('Dados recebidos:', data); // Log para depuração
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao carregar a lista de livros:', error);
      }
    );
  }

  deleteLivro(codL: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.deleteLivro(codL).subscribe(
        () => {
          alert('Livro excluído com sucesso!');
          this.loadLivros(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir o livro:', error);
          alert('Erro ao excluir o livro: ' + error.message);
        }
      );
    }
  }
}
