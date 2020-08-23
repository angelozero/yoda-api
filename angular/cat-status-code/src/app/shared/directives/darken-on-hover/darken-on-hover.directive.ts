import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appDarkenOnHoverDirective]'
})
export class DarkenOnHoverDirective {

@Input() brightness = '70%'

  constructor(private elementDom: ElementRef, private render: Renderer2) {}

  @HostListener('mouseover')
  darkOn() {
    this.render.setStyle(this.elementDom.nativeElement, 'filter', `brightness(${this.brightness}%)`);
  }
  @HostListener('mouseleave')
  darkOff() {
    this.render.setStyle(this.elementDom.nativeElement, 'filter', 'brightness(100%)');
  }
}