import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { SchoolSelectComponent } from './../../../../core/components/school-select/school-select.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/components/abstract-create-item/abstract-create-item.component';

@Component({
    selector: 'app-create-student',
    standalone: true,
    imports: [
        FormValidatorComponent,
        InputLabelComponent,
        ReactiveFormsModule,
        SchoolSelectComponent,
        ApiContentWrapperComponent,
    ],
    templateUrl: './create-student.component.html',
    styleUrl: './create-student.component.css',
})
export class CreateStudentComponent extends AbstractCreateItemComponent {
    private readonly PATH = 'students';

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
        const createdStudent = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
        };

        this.form.markAsTouched();

        if (this.form.valid) {
            createdStudent['schoolId'] = Number(createdStudent['schoolId']);

            this.apiService
                .post<Student>(this.PATH, createdStudent)
                .subscribe(() => {
                    this.router.navigate(['/students']);
                });
        }
    }
}

type Student = {
    firstName: string;
    lastName: string;
    schoolId: number;
};
