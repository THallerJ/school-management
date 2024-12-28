import { Component, Input, EventEmitter, Output } from '@angular/core';
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
    @Input() errorFlag?: boolean;
    @Input() buttonText?: string;
    @Input() isButtonError?: boolean;
    @Input() buttonErrorMsg =
        'This item could not be deleted since it still has dependents.';
    @Input() useAltButtonColor?: boolean;
    @Input() hideButton?: boolean;
    @Input() altButtonMessage?: string;
    @Output() clickEvent = new EventEmitter();

    onClick() {
        this.clickEvent.emit();
    }
}
