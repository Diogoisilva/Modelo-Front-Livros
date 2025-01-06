import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAnoValidation]'
})
export class AnoValidationDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.substring(0, 4); // Limita a 4 caracteres
    input.value = value;
  }
}
