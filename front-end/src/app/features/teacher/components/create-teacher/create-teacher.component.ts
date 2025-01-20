import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { TeacherFormComponent } from './../teacher-form/teacher-form.component';
import { TeacherFormService } from './../../services/teacher-form.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
@Component({
    selector: 'app-create-teacher',
    standalone: true,
    imports: [
        FormValidatorComponent,
        ReactiveFormsModule,
        ApiContentWrapperComponent,
        TeacherFormComponent,
    ],
    templateUrl: './create-teacher.component.html',
    styleUrl: './create-teacher.component.css',
})
export class CreateTeacherComponent extends AbstractCreateItemComponent {
    override PATH = 'teachers';
    override REDIRECT = '/teachers';

    loadingSchools = true;

    constructor(
        override apiService: ApiService,
        override router: Router,
        private teacherFormService: TeacherFormService,
    ) {
        super(apiService, router);
    }

    override initForm() {
        this.form = this.teacherFormService.buildForm();
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}
