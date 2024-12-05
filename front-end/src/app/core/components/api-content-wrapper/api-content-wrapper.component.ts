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
    @Input() loading!: boolean;
    @Input() content!: unknown;
    @Input() buttonText!: string;
    @Input() useAltButtonColor?: boolean;
    @Input() hideButton?: boolean;
    @Output() clickEvent = new EventEmitter();

    onClick() {
        this.clickEvent.emit();
    }
}
