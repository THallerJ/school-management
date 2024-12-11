import { Component } from '@angular/core';
import { TeacherDto, TeacherDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { SchoolSelectComponent } from './../../../../core/components/school-select/school-select.component';
import { CourseNoTeacherPipe } from '../../pipes/course-no-teacher.pipe';
import { AbstractViewItemComponent } from '../../../../core/components/abstract-view-item/abstract-view-item.component';
@Component({
    selector: 'app-view-teacher',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormValidatorComponent,
        InputLabelComponent,
        ViewItemWrapperComponent,
        ItemListHeaderComponent,
        ListItemComponent,
        ConditionalMessageComponent,
        SchoolSelectComponent,
        CourseNoTeacherPipe,
    ],
    templateUrl: './view-teacher.component.html',
    styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent extends AbstractViewItemComponent<
    TeacherDto,
    UpdatedTeacher
> {
    PATH = 'teachers';
    REDIRECT = '/teachers';
    SCHEMA = TeacherDtoSchema;
    loadingSchools = true;

    patchForm() {
        this.form.patchValue({
            firstName: this.item?.firstName,
            lastName: this.item?.lastName,
            school: this.item?.school?.id,
        });
    }

    initForm() {
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
