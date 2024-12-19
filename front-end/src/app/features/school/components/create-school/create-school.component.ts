import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { SchoolFormComponent } from '../school-form/school-form.component';
import { SchoolFormService } from '../../services/school-form.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';

@Component({
    selector: 'app-create-school',
    standalone: true,
    imports: [ReactiveFormsModule, FormValidatorComponent, SchoolFormComponent],
    templateUrl: './create-school.component.html',
    styleUrl: './create-school.component.css',
})
export class CreateSchoolComponent extends AbstractCreateItemComponent {
    override PATH = 'schools';
    override REDIRECT = '/schools';

    constructor(
        override apiService: ApiService,
        override router: Router,
        private schoolFormService: SchoolFormService,
    ) {
        super(apiService, router);
    }

    override initForm() {
        this.form = this.schoolFormService.buildForm();
    }
}
