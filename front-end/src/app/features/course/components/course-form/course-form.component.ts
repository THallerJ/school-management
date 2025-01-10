import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-course-form',
    standalone: true,
    imports: [SelectItemComponent, InputLabelComponent, ReactiveFormsModule],
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) buttonText!: string;
    @Input({ required: true }) disableButton!: boolean;
    @Output() loadSchoolsEvent = new EventEmitter();
    @Output() loadTeachersEvent = new EventEmitter();
    @Output() submitItemEvent = new EventEmitter();

    finishLoadingSchools() {
        this.loadSchoolsEvent.emit();
    }
    finishLoadingTeachers() {
        this.loadTeachersEvent.emit();
    }

    submitItem() {
        this.submitItemEvent.emit();
    }
}
