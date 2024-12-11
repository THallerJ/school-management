import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/components/abstract-create-item/abstract-create-item.component';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
@Component({
    selector: 'app-create-student',
    standalone: true,
    imports: [
        FormValidatorComponent,
        InputLabelComponent,
        ReactiveFormsModule,
        SelectItemComponent,
        ApiContentWrapperComponent,
    ],
    templateUrl: './create-student.component.html',
    styleUrl: './create-student.component.css',
})
export class CreateStudentComponent extends AbstractCreateItemComponent<CreatedStudent> {
    override PATH = 'students';
    override REDIRECT = '/students';

    override initForm() {
        this.form = this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                school: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }

    override getCreatedItem(): CreatedStudent {
        return {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
        };
    }
}

type CreatedStudent = {
    firstName: string;
    lastName: string;
    schoolId: number;
};
