import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { AutorService } from '../../services/autor.service';
import { AssuntoService } from '../../services/assunto.service';
import { Livro, Autor, Assunto } from '../livro.model';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrecoMaskDirective } from '../../directives/preco-mask.directive';
import { AnoValidationDirective } from '../../directives/ano-validation.directive';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, PrecoMaskDirective, AnoValidationDirective, ReactiveFormsModule],
  providers: [LivroService, AutorService, AssuntoService]
})
export class LivroFormComponent implements OnInit {
  livroForm: FormGroup;

  livro: Livro = {
    codL: 0,
    titulo: '',
    editora: '',
    edicao: '',
    anoPublicacao: '',
    preco: 0,
    formaCompra: '',
    autor: null,
    assunto: null
  };

  autores: Autor[] = [];
  assuntos: Assunto[] = [];

  autorSelecionado: number | null = null;
  assuntoSelecionado: number | null = null;

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: ['', Validators.required],
      anoPublicacao: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      preco: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      formaCompra: ['', Validators.required],
      autor: [null, Validators.required],
      assunto: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const codL = this.route.snapshot.paramMap.get('codL');
    if (codL) {
      this.livroService.getLivroById(parseInt(codL)).subscribe((data) => {
        if (data) {
          this.livro = data;
          this.autorSelecionado = this.livro.autor?.codAu || null;
          this.assuntoSelecionado = this.livro.assunto?.codAssunto || null;
          this.livroForm.patchValue({
            titulo: this.livro.titulo,
            editora: this.livro.editora,
            edicao: this.livro.edicao,
            anoPublicacao: this.livro.anoPublicacao,
            preco: this.livro.preco,
            formaCompra: this.livro.formaCompra,
            autor: this.autorSelecionado,
            assunto: this.assuntoSelecionado
          });
        } else {
          alert('Livro não encontrado!');
          this.router.navigate(['/livros']);
        }
      });
    }
    this.loadAutores();
    this.loadAssuntos();
  }


  loadAutores(): void {
    this.autorService.getAutores().subscribe((data) => {
      this.autores = data;
    });
  }

  loadAssuntos(): void {
    this.assuntoService.getAssuntos().subscribe((data) => {
      this.assuntos = data;
    });
  }

  onSubmit(): void {
    if (this.livroForm.valid) {
      const livroToSave: Livro = {
        codL: this.livro.codL,
        titulo: this.livroForm.value.titulo,
        editora: this.livroForm.value.editora,
        edicao: this.livroForm.value.edicao,
        anoPublicacao: this.livroForm.value.anoPublicacao,
        preco: this.livroForm.value.preco,
        formaCompra: this.livroForm.value.formaCompra,
        autor: this.livroForm.value.autor ? { codAu: this.livroForm.value.autor } : null,
        assunto: this.livroForm.value.assunto ? { codAssunto: this.livroForm.value.assunto } : null
      };

      console.log('Objeto Livro para salvar:', livroToSave);

      if (this.livro.codL) {
        this.livroService.updateLivro(this.livro.codL, livroToSave).subscribe(
          () => {
            alert('Livro atualizado com sucesso!');
            this.router.navigate(['/livros']);
          },
          (error) => {
            alert('Erro ao atualizar livro: ' + error.message);
          }
        );
      } else {
        this.livroService.createLivro(livroToSave).subscribe(
          () => {
            alert('Livro criado com sucesso!');
            this.router.navigate(['/livros']);
          },
          (error) => {
            alert('Erro ao criar livro: ' + error.message);
          }
        );
      }
    } else {
      console.error('Formulário inválido. Erros de validação:');
      Object.keys(this.livroForm.controls).forEach((field) => {
        const control = this.livroForm.get(field);
        if (control?.invalid) {
          console.error(`- ${field}:`, control.errors);
        }
      });
    }
  }


  onCancel(): void {
    this.location.back();
  }
}
