import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { StudentFormComponent } from './../student-form/student-form.component';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { StudentFormService } from '../../services/student-form.service';
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
export class CreateStudentComponent extends AbstractCreateItemComponent {
    override PATH = 'students';
    override REDIRECT = '/students';

    loading = true;

    constructor(
        override apiService: ApiService,
        override router: Router,
        private studentFormService: StudentFormService,
    ) {
        super(apiService, router);
    }

    override initForm() {
        this.form = this.studentFormService.buildForm();
    }

    finishLoading() {
        this.loading = false;
    }
}
