import { Component } from '@angular/core';
import { SchoolDto, SchoolDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { CourseNoSchoolPipe } from './../../pipes/course-no-school.pipe';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { SchoolFormComponent } from '../school-form/school-form.component';
@Component({
    selector: 'app-view-school',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormValidatorComponent,
        InputLabelComponent,
        ViewItemWrapperComponent,
        ItemListHeaderComponent,
        ListItemComponent,
        CourseNoSchoolPipe,
        ConditionalMessageComponent,
        SchoolFormComponent,
    ],
    templateUrl: './view-school.component.html',
    styleUrl: './view-school.component.css',
})
export class ViewSchoolComponent extends AbstractViewItemComponent<
    SchoolDto,
    UpdatedSchool
> {
    override PATH = 'schools';
    override SCHEMA = SchoolDtoSchema;
    override REDIRECT = '/schools';

    override patchForm() {
        this.form.patchValue({
            name: this.item?.name,
            address: this.item?.address,
            phoneNumber: this.item?.phoneNumber,
        });
    }

    override initForm() {
        this.form = this.formBuilder.group(
            {
                name: ['', Validators.minLength(3)],
                address: ['', Validators.minLength(3)],
                phoneNumber: [
                    '',
                    Validators.compose([
                        Validators.minLength(10),
                        Validators.maxLength(10),
                        Validators.pattern(/^\d+$/),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }

    override getUpdatedItem(): UpdatedSchool {
        return {
            name: this.form.value.name,
            address: this.form.value.address,
            phoneNumber: this.form.value.phoneNumber,
        };
    }
}

type UpdatedSchool = {
    name?: string;
    address?: string;
    phoneNumber?: string;
};
