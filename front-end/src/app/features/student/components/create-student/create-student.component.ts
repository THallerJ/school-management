import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { SchoolSelectComponent } from './../../../../core/components/school-select/school-select.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ApiService } from '../../../../core/services/api-service.service';

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
export class CreateStudentComponent {
    private readonly PATH = 'students';
    createStudentForm!: FormGroup;
    loading = true;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private router: Router,
    ) {}

    initCreateStudentForm() {
        this.createStudentForm = this.formBuilder.group(
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

    createStudent() {
        const createdStudent = {
            firstName: this.createStudentForm.value.firstName,
            lastName: this.createStudentForm.value.lastName,
            schoolId: this.createStudentForm.value.school,
        };

        this.createStudentForm.markAsTouched();

        if (this.createStudentForm.valid) {
            createdStudent['schoolId'] = Number(createdStudent['schoolId']);

            this.apiService
                .post<Student>(this.PATH, createdStudent)
                .subscribe(() => {
                    this.router.navigate(['/students']);
                });
        }
    }

    finishLoading() {
        this.loading = false;
    }

    ngOnInit() {
        this.initCreateStudentForm();
    }
}

type Student = {
    firstName: string;
    lastName: string;
    schoolId: number;
};
