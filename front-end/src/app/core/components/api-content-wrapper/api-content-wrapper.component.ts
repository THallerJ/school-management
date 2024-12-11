import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'app-api-content-wrapper',
    standalone: true,
    imports: [SpinnerComponent],
    templateUrl: './api-content-wrapper.component.html',
    styleUrl: './api-content-wrapper.component.css',
})
export class ApiContentWrapperComponent {
    @Input({ required: true }) loading!: boolean;
    @Input() contentExists?: boolean;
    @Input() ignoreContent?: boolean;
    @Input() buttonText?: string;
    @Input() useAltButtonColor?: boolean;
    @Input() hideButton?: boolean;
    @Input() altButtonMessage?: string;
    @Output() clickEvent = new EventEmitter();

    onClick() {
        this.clickEvent.emit();
    }
}
