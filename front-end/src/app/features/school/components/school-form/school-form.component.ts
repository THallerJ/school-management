import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-school-form',
    standalone: true,
    imports: [ReactiveFormsModule, InputLabelComponent, ReactiveFormsModule],
    templateUrl: './school-form.component.html',
    styleUrl: './school-form.component.css',
})
export class SchoolFormComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) buttonText!: string;
    @Output() submitEvent = new EventEmitter();

    submitItem() {
        this.submitEvent.emit();
    }
}
