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
export class CreateTeacherComponent implements OnInit {
    createTeacherForm!: FormGroup;
    loading = true;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private router: Router,
    ) {}

    initCreateTeacherForm() {
        this.createTeacherForm = this.formBuilder.group(
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

    createTeacher() {
        const createdTeacher = {
            firstName: this.createTeacherForm.value.firstName,
            lastName: this.createTeacherForm.value.lastName,
            schoolId: this.createTeacherForm.value.school,
        };

        this.createTeacherForm.markAsTouched();

        if (this.createTeacherForm.valid) {
            createdTeacher['schoolId'] = Number(createdTeacher['schoolId']);

            this.apiService
                .post<Teacher>('teacher', createdTeacher)
                .subscribe(() => {
                    this.router.navigate(['/teachers']);
                });
        }
    }

    finishLoading() {
        this.loading = false;
    }

    ngOnInit() {
        this.initCreateTeacherForm();
    }
}

type Teacher = {
    firstName: string;
    lastName: string;
    schoolId: number;
};
