import { ApiService } from './../../../../core/services/api-service.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { CourseFormService } from '../../services/course-form.service';
import { FormCourse } from '../../models/types';
@Component({
    selector: 'app-create-course',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormValidatorComponent,
        CourseFormComponent,
        ApiContentWrapperComponent,
    ],
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.css',
})
export class CreateCourseComponent extends AbstractCreateItemComponent<FormCourse> {
    override PATH = 'courses';
    override REDIRECT = '/courses';

    loadingSchools = true;
    loadingTeachers = true;

    constructor(
        override formBuilder: FormBuilder,
        override apiService: ApiService,
        override router: Router,
        private courseFormService: CourseFormService,
    ) {
        super(formBuilder, apiService, router);
    }

    override initForm(): void {
        this.form = this.courseFormService.buildForm(this.formBuilder);
    }

    override getCreatedItem(): FormCourse {
        return this.form.value;
    }

    finishLoadingTeachers() {
        this.loadingTeachers = false;
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}
