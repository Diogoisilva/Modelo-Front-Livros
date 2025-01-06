import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AutorListComponent } from './app/autor/autor-list/autor-list.component';
import { AutorFormComponent } from './app/autor/autor-form/autor-form.component';
import { AssuntoListComponent } from './app/assunto/assunto-list/assunto-list.component';
import { AssuntoFormComponent } from './app/assunto/assunto-form/assunto-form.component';
import { LivroListComponent } from './app/livro/livro-list/livro-list.component';
import { LivroFormComponent } from './app/livro/livro-form/livro-form.component';

const routes: Routes = [
  { path: 'autores', component: AutorListComponent },
  { path: 'autores/novo', component: AutorFormComponent },
  { path: 'autores/:codAu', component: AutorFormComponent },
  { path: 'assuntos', component: AssuntoListComponent },
  { path: 'assuntos/novo', component: AssuntoFormComponent },
  { path: 'assuntos/:codAssunto', component: AssuntoFormComponent },
  { path: 'livros', component: LivroListComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'livros/:codl', component: LivroFormComponent },
  { path: '', redirectTo: '/autores', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      FormsModule
    )
  ]
}).catch(err => console.error(err));
