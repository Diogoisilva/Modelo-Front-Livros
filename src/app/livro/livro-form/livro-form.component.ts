import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { AutorService } from '../../services/autor.service';
import { AssuntoService } from '../../services/assunto.service';
import { PrecoMaskDirective } from '../../directives/preco-mask.directive';
import { AnoValidationDirective } from '../../directives/ano-validation.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { Livro, Autor, Assunto } from '../livro.model';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, PrecoMaskDirective, AnoValidationDirective],
  providers: [LivroService, AutorService, AssuntoService]
})
export class LivroFormComponent implements OnInit {
  livro: Livro = {
    codl: null,
    titulo: '',
    editora: '',
    edicao: '',
    anoPublicacao: '',
    preco: '',
    formaCompra: '',
    autor: null,
    assunto: { descricao: '' }
  };
  autores: Autor[] = [];
  assuntos: Assunto[] = [];

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const codl = this.route.snapshot.paramMap.get('codl');
    if (codl) {
      this.livroService.getLivroById(parseInt(codl)).subscribe((data) => {
        this.livro = data;
        this.livro.autor = data.autor ? { id: data.autor.id, nome: data.autor.nome } : null;
        this.livro.assunto = data.assunto ? { descricao: data.assunto.descricao } : { descricao: '' };
      });
    }
    this.loadAutores();
    this.loadAssuntos();
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe((data) => {
      this.autores = data.map(autor => ({
        id: autor.codAu,
        nome: autor.nome
      }));
    });
  }

  loadAssuntos(): void {
    this.assuntoService.getAssuntos().subscribe((data) => {
      this.assuntos = data;
    });
  }

  onSubmit(): void {
    this.livro.preco = this.livro.preco.replace('R$ ', '').replace(',', '.');
    if (this.livro.codl) {
      this.livroService.updateLivro(this.livro.codl, this.livro).subscribe(() => {
        this.router.navigate(['/livros']);
      });
    } else {
      this.assuntoService.createAssunto(this.livro.assunto).subscribe((newAssunto) => {
        this.livro.assunto = newAssunto; // Atribui o novo assunto ao livro
        this.livroService.createLivro(this.livro).subscribe(() => {
          this.router.navigate(['/livros']);
        });
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
