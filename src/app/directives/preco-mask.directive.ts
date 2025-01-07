import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrecoMask]'
})
export class PrecoMaskDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;

    // Remove qualquer caractere que não seja número
    let value = input.value.replace(/\D/g, '');

    // Atualiza o valor no campo de entrada
    this.renderer.setProperty(input, 'value', value);
  }
}
