import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service.service';
import {
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { SelectLabelComponent } from '../../../../core/components/select-label/select-label.component';
@Component({
    selector: 'app-create-teacher',
    standalone: true,
    imports: [
        FormValidatorComponent,
        InputLabelComponent,
        ReactiveFormsModule,
        SelectLabelComponent,
    ],
    templateUrl: './create-teacher.component.html',
    styleUrl: './create-teacher.component.css',
})
export class CreateTeacherComponent implements OnInit {
    createTeacherForm!: FormGroup;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
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
        }
        /*
        if (this.createTeacherForm.valid) {
            this.apiService
                .post<Teacher>('teacher', createdTeacher)
                .subscribe(() => {
                    this.router.navigate(['/teachers']);
                });
        } */
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
