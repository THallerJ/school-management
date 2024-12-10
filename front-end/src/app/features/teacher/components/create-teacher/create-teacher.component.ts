import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { SchoolSelectComponent } from './../../../../core/components/school-select/school-select.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/components/abstract-create-item/abstract-create-item.component';
@Component({
    selector: 'app-create-teacher',
    standalone: true,
    imports: [
        FormValidatorComponent,
        InputLabelComponent,
        ReactiveFormsModule,
        SchoolSelectComponent,
        ApiContentWrapperComponent,
    ],
    templateUrl: './create-teacher.component.html',
    styleUrl: './create-teacher.component.css',
})
export class CreateTeacherComponent extends AbstractCreateItemComponent {
    private readonly PATH = 'teachers';

    initForm() {
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

    createItem() {
        const createdTeacher = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
        };

        this.form.markAsTouched();

        if (this.form.valid) {
            createdTeacher['schoolId'] = Number(createdTeacher['schoolId']);

            this.apiService
                .post<Teacher>(this.PATH, createdTeacher)
                .subscribe(() => {
                    this.router.navigate(['/teachers']);
                });
        }
    }
}

type Teacher = {
    firstName: string;
    lastName: string;
    schoolId: number;
};
