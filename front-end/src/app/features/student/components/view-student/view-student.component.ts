import { Component } from '@angular/core';
import { StudentDto, StudentDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractViewItemComponent } from '../../../../core/components/abstract-view-item/abstract-view-item.component';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
import { CourseRegistrationPipe } from '../../pipes/course-registration.pipe';

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

    loadingSchools = true;

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
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}

type UpdatedStudent = {
    firstName?: string;
    lastName?: string;
    schoolId?: number;
};
