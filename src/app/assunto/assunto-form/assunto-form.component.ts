import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssuntoService } from '../../services/assunto.service';

@Component({
  selector: 'app-assunto-form',
  templateUrl: './assunto-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AssuntoService]
})
export class AssuntoFormComponent implements OnInit {
  assunto = {
    codAssunto: null,
    descricao: ''
  };

  constructor(
    private assuntoService: AssuntoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const codAssunto = this.route.snapshot.paramMap.get('codAssunto');
    if (codAssunto) {
      this.assuntoService.getAssuntoById(parseInt(codAssunto)).subscribe((data) => {
        this.assunto = data;
      });
    }
  }

  onSubmit(): void {
    if (this.assunto.codAssunto) {
      this.assuntoService.updateAssunto(this.assunto.codAssunto, this.assunto).subscribe(() => {
        this.router.navigate(['/assuntos']);
      });
    } else {
      this.assuntoService.createAssunto(this.assunto).subscribe(() => {
        this.router.navigate(['/assuntos']);
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
