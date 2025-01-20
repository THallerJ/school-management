import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';

@Component({
    selector: 'app-teacher-form',
    standalone: true,
    imports: [ReactiveFormsModule, InputLabelComponent, SelectItemComponent],
    templateUrl: './teacher-form.component.html',
    styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) buttonText!: string;
    @Input({ required: true }) disableButton!: boolean;
    @Output() loadSchoolsEvent = new EventEmitter();
    @Output() submitEvent = new EventEmitter();

    submitItem() {
        this.submitEvent.emit();
    }

    loadingSchools() {
        this.loadSchoolsEvent.emit(false);
    }
}
