import { Component } from '@angular/core';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { CourseDto, CourseDtoSchema } from '../../../../core/types';
import { Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
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
    ],
    templateUrl: './view-course.component.html',
    styleUrl: './view-course.component.css',
})
export class ViewCourseComponent
    extends AbstractViewItemComponent<CourseDto, UpdatedCourse>
    implements RegistrationInterface
{
    override SCHEMA = CourseDtoSchema;
    override PATH = 'courses';
    override REDIRECT = '/courses';

    registrationForm!: FormGroup;
    loadingSchools = true;
    loadingTeachers = true;
    loadingRegistrations = true;

    override getUpdatedItem(): UpdatedCourse {
        return {
            name: this.form.value.name,
            credits: this.form.value.credits,
            schoolId: this.form.value.school,
            teacherId: this.form.value.teacher,
        };
    }

    override initForm(): void {
        this.form = this.formBuilder.group(
            {
                name: '',
                credits: '',
                school: ['', Validators.pattern('^[0-9]*$')],
                teacher: ['', Validators.pattern('^[0-9]*$')],
            },
            { updateOn: 'submit' },
        );

        this.registrationForm = this.formBuilder.group({
            student: ['', Validators.required],
        });
    }

    override patchForm(): void {
        this.form.patchValue({
            name: this.item?.name,
            credits: this.item?.credits,
            school: this.item?.school?.id,
            teacher: this.item?.teacher?.id,
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

    finishLoadingSchools() {
        this.loadingSchools = false;
    }

    finishLoadingTeachers() {
        this.loadingTeachers = false;
    }

    finishLoadingRegistrations() {
        this.loadingRegistrations = false;
    }
}

type UpdatedCourse = {
    name?: string;
    credits?: number;
    schoolId?: number;
    teacherId?: number;
};
