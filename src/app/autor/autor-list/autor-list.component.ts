import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AutorService]
})
export class AutorListComponent implements OnInit {
  autores: any[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe((data) => {
      this.autores = data;
    }, (error) => {
      console.error('Erro ao carregar a lista de autores:', error);
    });
  }

  deleteAutor(codAu: number): void {
    this.autorService.deleteAutor(codAu).subscribe(() => {
      this.autores = this.autores.filter(autor => autor.codAu !== codAu);
    }, (error) => {
      console.error('Erro ao deletar o autor:', error);
    });
  }
}
