import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../types';

@Component({
    selector: 'app-select-label',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './select-label.component.html',
    styleUrl: './select-label.component.css',
})
export class SelectLabelComponent {
    @Input() name!: string;
    @Input() group!: FormGroup;
    @Input() value?: string;
    @Input() options?: SelectOption[];
}
