import { Component, ApplicationRef } from '@angular/core';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { CourseDto, CourseDtoSchema } from '../../../../core/types';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { RegistrationInterface } from '../../../../core/interfaces/registration-interface';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { StudentRegistrationPipe } from '../../pipes/student-registration.pipe';
import { AddRegistration } from '../../../../core/types';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { ModalService } from '../../../../core/services/modal.service';
import { CourseFormService } from '../../services/course-form.service';
import { ItemUpdatedComponent } from '../../../../core/components/item-updated/item-updated.component';
@Component({
    selector: 'app-view-course',
    standalone: true,
    imports: [
        ViewItemWrapperComponent,
        SelectItemComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        FormValidatorComponent,
        ConditionalMessageComponent,
        ReactiveFormsModule,
        StudentRegistrationPipe,
        CourseFormComponent,
        ItemUpdatedComponent,
    ],
    templateUrl: './view-course.component.html',
    styleUrl: './view-course.component.css',
})
export class ViewCourseComponent
    extends AbstractViewItemComponent<CourseDto>
    implements RegistrationInterface
{
    override SCHEMA = CourseDtoSchema;
    override PATH = 'courses';
    override REDIRECT = '/courses';
    override VIEW_REDIRECT = 'students';

    registrationForm!: FormGroup;
    loadingSchools = true;
    loadingTeachers = true;
    loadingRegistrations = true;

    constructor(
        override route: ActivatedRoute,
        override apiService: ApiService,
        override router: Router,
        override modalService: ModalService,
        override appRef: ApplicationRef,
        private courseFormService: CourseFormService,
        private formBuilder: FormBuilder,
    ) {
        super(route, apiService, router, modalService, appRef);
    }

    override initForm() {
        this.registrationForm = this.formBuilder.group({
            student: ['', Validators.required],
        });

        return this.courseFormService.buildForm();
    }

    override patchForm(): void {
        this.form.patchValue({
            name: this.item?.name,
            credits: this.item?.credits,
            schoolId: this.item?.school?.id,
            teacherId: this.item?.teacher?.id,
        });
    }

    removeLocalRegistration(id: number): void {
        this.item?.registrations.map(r => {
            if (r.student?.id === id) {
                this.item?.registrations.splice(
                    this.item?.registrations.indexOf(r),
                    1,
                );
            }
        });
    }

    removeRegistration(studentId: number) {
        if (this.item) {
            this.apiService
                .delete(this.REGISTRATIONS_PATH, {
                    body: { courseId: this.item.id, studentId: studentId },
                })
                .subscribe(() => {
                    this.removeLocalRegistration(studentId);
                });
        }
    }

    addRegistration() {
        this.registrationForm.markAsTouched();

        if (this.item) {
            this.apiService
                .post<AddRegistration>(this.REGISTRATIONS_PATH, {
                    studentId: this.registrationForm.value.student,
                    courseId: this.item.id,
                })
                .subscribe(() => {
                    window.location.reload();
                });
        }
    }

    finishLoadingTeachers() {
        this.loadingTeachers = false;
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }

    finishLoadingRegistrations() {
        this.loadingRegistrations = false;
    }
}
