import { Component } from '@angular/core';
import {
    StudentDto,
    StudentDtoSchema,
    AddRegistration,
} from '../../../../core/types';
import {
    ReactiveFormsModule,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
import { CourseRegistrationPipe } from '../../pipes/course-registration.pipe';
import { RegistrationInterface } from '../../../../core/interfaces/registration-interface';
import { StudentFormComponent } from './../student-form/student-form.component';
import { StudentFormService } from '../../services/student-form.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { ModalService } from '../../../../core/services/modal.service';
@Component({
    selector: 'app-view-student',
    standalone: true,
    imports: [
        ViewItemWrapperComponent,
        SelectItemComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        FormValidatorComponent,
        ConditionalMessageComponent,
        ReactiveFormsModule,
        CourseRegistrationPipe,
        StudentFormComponent,
    ],
    templateUrl: './view-student.component.html',
    styleUrl: './view-student.component.css',
})
export class ViewStudentComponent
    extends AbstractViewItemComponent<StudentDto>
    implements RegistrationInterface
{
    override PATH = 'students';
    override REDIRECT = '/students';
    override SCHEMA = StudentDtoSchema;

    registrationForm!: FormGroup;
    loadingSchools = true;
    loadingRegistrations = true;

    constructor(
        override route: ActivatedRoute,
        override apiService: ApiService,
        override router: Router,
        override modalService: ModalService,
        private studentFormService: StudentFormService,
        private formBuilder: FormBuilder,
    ) {
        super(route, apiService, router, modalService);
    }

    override patchForm(): void {
        this.form.patchValue({
            firstName: this.item?.firstName,
            lastName: this.item?.lastName,
            schoolId: this.item?.school?.id,
            email: this.item?.email,
        });
    }

    override initForm() {
        this.registrationForm = this.formBuilder.group({
            course: ['', Validators.required],
        });

        return this.studentFormService.buildForm();
    }

    removeLocalRegistration(courseId: number) {
        this.item?.registrations.map(r => {
            if (r.course?.id === courseId) {
                this.item?.registrations.splice(
                    this.item?.registrations.indexOf(r),
                    1,
                );
            }
        });
    }

    removeRegistration(courseId: number) {
        if (this.item) {
            this.apiService
                .delete(this.REGISTRATIONS_PATH, {
                    body: { courseId: courseId, studentId: this.item.id },
                })
                .subscribe(() => {
                    this.removeLocalRegistration(courseId);
                });
        }
    }

    addRegistration() {
        this.registrationForm.markAllAsTouched();

        if (this.item) {
            this.apiService
                .post<AddRegistration>(this.REGISTRATIONS_PATH, {
                    studentId: this.item.id,
                    courseId: this.registrationForm.value.course,
                })
                .subscribe(() => {
                    window.location.reload();
                });
        }
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }

    finishLoadingRegistrations() {
        this.loadingRegistrations = false;
    }
}
