import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [ReactiveFormsModule, InputLabelComponent, SelectItemComponent],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.css',
})
export class StudentFormComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) buttonText!: string;
    @Input({ required: true }) disableButton!: boolean;
    @Output() submitEvent = new EventEmitter();

    submitItem() {
        this.submitEvent.emit();
    }
}
