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
@Component({
    selector: 'app-create-school',
    standalone: true,
    imports: [ReactiveFormsModule, FormValidatorComponent, InputLabelComponent],
    templateUrl: './create-school.component.html',
    styleUrl: './create-school.component.css',
})
export class CreateSchoolComponent implements OnInit {
    createSchoolForm!: FormGroup;
    private readonly PATH = 'schools';

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    initCreateSchoolForm() {
        this.createSchoolForm = this.formBuilder.group(
            {
                name: ['', Validators.required],
                address: ['', Validators.required],
                phoneNumber: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(10),
                        Validators.pattern(/^\d+$/),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }

    ngOnInit() {
        this.initCreateSchoolForm();
    }

    createSchool() {
        const createdSchool = {
            name: this.createSchoolForm.value.name,
            address: this.createSchoolForm.value.address,
            phoneNumber: this.createSchoolForm.value.phoneNumber,
        };

        this.createSchoolForm.markAsTouched();

        if (this.createSchoolForm.valid) {
            this.apiService
                .post<School>(this.PATH, createdSchool)
                .subscribe(() => {
                    this.router.navigate(['/schools']);
                });
        }
    }
}

type School = {
    name: string;
    address: string;
    phoneNumber: string;
};
