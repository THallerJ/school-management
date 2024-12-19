import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { StudentFormComponent } from './../student-form/student-form.component';
import { FormStudent } from '../../models/types';
@Component({
    selector: 'app-create-student',
    standalone: true,
    imports: [
        FormValidatorComponent,
        ReactiveFormsModule,
        ApiContentWrapperComponent,
        StudentFormComponent,
    ],
    templateUrl: './create-student.component.html',
    styleUrl: './create-student.component.css',
})
export class CreateStudentComponent extends AbstractCreateItemComponent<FormStudent> {
    override PATH = 'students';
    override REDIRECT = '/students';

    loading = true;

    override initForm() {
        this.form = this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: [
                    '',
                    Validators.compose([Validators.required, Validators.email]),
                ],
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

    override getCreatedItem(): FormStudent {
        return {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
            email: this.form.value.email,
        };
    }

    finishLoading() {
        this.loading = false;
    }
}
