import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: `[clicked]`
})

export class clickedDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @HostListener('document: click', ['$event'])
  clicked(event: Event) {
    this.renderer.setElementClass(this.el.nativeElement, 'is-active', true);
  }


}
