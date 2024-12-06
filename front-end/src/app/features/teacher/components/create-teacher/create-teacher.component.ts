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
                school: ['', Validators.required],
            },
            { updateOn: 'submit' },
        );
    }

    ngOnInit() {
        this.initCreateTeacherForm();
    }
}
