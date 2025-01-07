import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importando o CommonModule
import { RelatorioService } from '../services/relatorio.service';

@Component({
  selector: 'app-relatorio-livros',
  templateUrl: './relatorio-livros.component.html',
  standalone: true,
  imports: [CommonModule]  // Adicionando CommonModule aqui
})
export class RelatorioLivrosComponent implements OnInit {
  relatorioLivros: any[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.relatorioService.getRelatorioLivros().subscribe((data) => {
      this.relatorioLivros = data;
    });
  }
}
