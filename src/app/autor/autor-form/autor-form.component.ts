import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AutorService]
})
export class AutorFormComponent implements OnInit {
  autor = {
    codAu: null,
    nome: ''
  };

  constructor(
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const codAu = this.route.snapshot.paramMap.get('codAu');
    if (codAu) {
      this.autorService.getAutorById(parseInt(codAu)).subscribe((data) => {
        this.autor = data;
      });
    }
  }

  onSubmit(): void {
    if (this.autor.codAu) {
      this.autorService.updateAutor(this.autor.codAu, this.autor).subscribe(() => {
        this.router.navigate(['/autores']);
      });
    } else {
      this.autorService.createAutor(this.autor).subscribe(() => {
        this.router.navigate(['/autores']);
      });
    }
  }
  
  onCancel(): void {
    this.location.back();
  }
}
