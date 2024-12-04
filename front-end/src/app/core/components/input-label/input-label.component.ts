import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-input-label',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './input-label.component.html',
    styleUrl: './input-label.component.css',
})
export class InputLabelComponent {
    @Input() name!: string;
    @Input() type!: string;
    @Input() group!: FormGroup;
    @Input() value?: string;
}
