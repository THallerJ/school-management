import { Component } from '@angular/core';
import { StudentDto, StudentDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
import { CourseRegistrationPipe } from '../../pipes/course-registration.pipe';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-view-student',
    standalone: true,
    imports: [
        ViewItemWrapperComponent,
        SelectItemComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        FormValidatorComponent,
        InputLabelComponent,
        ConditionalMessageComponent,
        ReactiveFormsModule,
        CourseRegistrationPipe,
    ],
    templateUrl: './view-student.component.html',
    styleUrl: './view-student.component.css',
})
export class ViewStudentComponent extends AbstractViewItemComponent<
    StudentDto,
    UpdatedStudent
> {
    override PATH = 'students';
    override REDIRECT = '/students';
    override SCHEMA = StudentDtoSchema;

    registrationForm!: FormGroup;
    loadingSchools = true;
    loadingCourses = true;

    override getUpdatedItem(): UpdatedStudent {
        return {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
        };
    }

    override patchForm(): void {
        this.form.patchValue({
            firstName: this.item?.firstName,
            lastName: this.item?.lastName,
            school: this.item?.school?.id,
        });
    }

    override initForm(): void {
        this.form = this.formBuilder.group(
            {
                firstName: '',
                lastName: '',
                school: ['', Validators.pattern('^[0-9]*$')],
            },
            { updateOn: 'submit' },
        );

        this.registrationForm = this.formBuilder.group({
            course: ['', Validators.required],
        });
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

    deleteRegistration(courseId: number) {
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
        if (this.item) {
            this.apiService
                .post<addRegistration>(this.REGISTRATIONS_PATH, {
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
        this.loadingCourses = false;
    }
}

type UpdatedStudent = {
    firstName?: string;
    lastName?: string;
    schoolId?: number;
};

type addRegistration = { courseId: number; studentId: number };
