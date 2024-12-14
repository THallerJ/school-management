import { Component } from '@angular/core';
import { TeacherDto, TeacherDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { CourseNoTeacherPipe } from '../../pipes/course-no-teacher.pipe';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { TeacherFormComponent } from './../teacher-form/teacher-form.component';
@Component({
    selector: 'app-view-teacher',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormValidatorComponent,
        ViewItemWrapperComponent,
        ItemListHeaderComponent,
        ListItemComponent,
        ConditionalMessageComponent,
        CourseNoTeacherPipe,
        TeacherFormComponent,
    ],
    templateUrl: './view-teacher.component.html',
    styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent extends AbstractViewItemComponent<
    TeacherDto,
    UpdatedTeacher
> {
    override PATH = 'teachers';
    override REDIRECT = '/teachers';
    override SCHEMA = TeacherDtoSchema;

    loadingSchools = true;

    override patchForm() {
        this.form.patchValue({
            firstName: this.item?.firstName,
            lastName: this.item?.lastName,
            school: this.item?.school?.id,
        });
    }

    override initForm() {
        this.form = this.formBuilder.group(
            {
                firstName: '',
                lastName: '',
                school: ['', Validators.pattern('^[0-9]*$')],
            },
            { updateOn: 'submit' },
        );
    }

    override getUpdatedItem(): UpdatedTeacher {
        return {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            schoolId: this.form.value.school,
        };
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}

type UpdatedTeacher = {
    firstName?: string;
    lastName?: string;
    schoolId?: number;
};
