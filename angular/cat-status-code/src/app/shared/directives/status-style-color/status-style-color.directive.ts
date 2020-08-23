import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appStatusStyleColorDirective]'
})
export class StatusStyleColorDirective {

  @Input() status = ''

  constructor(private elementDom: ElementRef, private render: Renderer2) { }

  @HostListener('mouseover')
  color() {
    this.render.setStyle(this.elementDom.nativeElement, 'background-color', this.checkColorByStatus(this.status));
  }
  @HostListener('mouseleave')
  incolor() {
    this.render.setStyle(this.elementDom.nativeElement, 'background-color', '#fff');

  }

  checkColorByStatus(status: string) {
    switch (status.trim().substring(0, 1)) {
      case "5":
        return '#f66';

      case "4":
        return '#ffff99';

      case "3":
        return '#b3ccff';

      case "2":
        return '#dfff80';

      case "1":
        return '#b3ccff';

      default:
        return '#fff'
    }

  }
}