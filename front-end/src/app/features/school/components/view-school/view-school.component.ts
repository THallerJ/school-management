import { Component, ApplicationRef } from '@angular/core';
import { SchoolDto, SchoolDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { CourseNoSchoolPipe } from './../../pipes/course-no-school.pipe';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { SchoolFormComponent } from '../school-form/school-form.component';
import { SchoolFormService } from '../../services/school-form.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { ModalService } from '../../../../core/services/modal.service';
import { ItemUpdatedComponent } from '../../../../core/components/item-updated/item-updated.component';
@Component({
    selector: 'app-view-school',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormValidatorComponent,
        ViewItemWrapperComponent,
        ItemListHeaderComponent,
        ListItemComponent,
        CourseNoSchoolPipe,
        ConditionalMessageComponent,
        SchoolFormComponent,
        ItemUpdatedComponent,
    ],
    templateUrl: './view-school.component.html',
    styleUrl: './view-school.component.css',
})
export class ViewSchoolComponent extends AbstractViewItemComponent<SchoolDto> {
    override PATH = 'schools';
    override SCHEMA = SchoolDtoSchema;
    override REDIRECT = '/schools';
    override VIEW_REDIRECT = 'courses';

    constructor(
        override route: ActivatedRoute,
        override apiService: ApiService,
        override router: Router,
        override modalService: ModalService,
        override appRef: ApplicationRef,
        private schoolFormService: SchoolFormService,
    ) {
        super(route, apiService, router, modalService, appRef);
    }

    override patchForm() {
        this.form.patchValue({
            name: this.item?.name,
            address: this.item?.address,
            phoneNumber: this.item?.phoneNumber,
        });
    }

    override initForm() {
        return this.schoolFormService.buildForm();
    }
}
