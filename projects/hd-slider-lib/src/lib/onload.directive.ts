import { Directive, EventEmitter, ElementRef, Output, AfterViewInit } from '@angular/core';
import {Observable} from 'rxjs';
import { of } from 'rxjs';

@Directive({
    selector: '[enlAppOnload]'
})
export class OnLoadDirective implements AfterViewInit {
    @Output() imageLoaded: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        if (typeof window === 'undefined') {
            return;
        }
        if (window) {
            of(window.getComputedStyle(this.el.nativeElement).backgroundImage).subscribe(style => {
                if (style) {
                    this.imageLoaded.emit(true);
                }
            });
        }
    }

}
