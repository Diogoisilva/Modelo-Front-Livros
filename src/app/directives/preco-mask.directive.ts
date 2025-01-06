import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrecoMask]'
})
export class PrecoMaskDirective {
  private readonly regex: RegExp = new RegExp(/^\d+$/g); // Permite apenas números
  private previousValue: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (!this.regex.test(value) && value !== '') {
      value = this.previousValue; // Reverte para o valor anterior se não for um número válido
    }

    const formattedValue = this.formatToReal(value);
    this.renderer.setProperty(input, 'value', formattedValue);
    this.previousValue = value; // Atualiza o valor anterior
  }

  private formatToReal(value: string): string {
    if (value === '') {
      return '';
    }

    const intValue = parseInt(value, 10);
    const reais = Math.floor(intValue / 100).toString();
    const centavos = (intValue % 100).toString().padStart(2, '0');

    return `R$ ${reais},${centavos}`;
  }
}
