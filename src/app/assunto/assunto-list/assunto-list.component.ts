import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssuntoService } from '../../services/assunto.service';

@Component({
  selector: 'app-assunto-list',
  templateUrl: './assunto-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AssuntoService]
})
export class AssuntoListComponent implements OnInit {
  assuntos: any[] = [];

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit(): void {
    this.loadAssuntos();
  }

  loadAssuntos(): void {
    this.assuntoService.getAssuntos().subscribe((data) => {
      this.assuntos = data;
    }, (error) => {
      console.error('Erro ao carregar a lista de assuntos:', error);
    });
  }

  deleteAssunto(codAssunto: number): void {
    this.assuntoService.deleteAssunto(codAssunto).subscribe(() => {
      this.assuntos = this.assuntos.filter(assunto => assunto.codAssunto !== codAssunto);
    }, (error) => {
      console.error('Erro ao deletar o assunto:', error);
    });
  }
}
