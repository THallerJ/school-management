import { ChangeDetectorRef, Component } from '@angular/core';
import { TeacherDto, TeacherDtoSchema } from '../../../../core/types';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { CourseNoTeacherPipe } from '../../pipes/course-no-teacher.pipe';
import { AbstractViewItemComponent } from '../../../../core/abstract/abstract-view-item/abstract-view-item.component';
import { TeacherFormComponent } from './../teacher-form/teacher-form.component';
import { TeacherFormService } from '../../services/teacher-form.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { ModalService } from '../../../../core/services/modal.service';
import { ItemUpdatedComponent } from '../../../../core/components/item-updated/item-updated.component';
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
        ItemUpdatedComponent,
    ],
    templateUrl: './view-teacher.component.html',
    styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent extends AbstractViewItemComponent<TeacherDto> {
    override PATH = 'teachers';
    override REDIRECT = '/teachers';
    override SCHEMA = TeacherDtoSchema;
    override VIEW_REDIRECT = 'courses';

    constructor(
        override route: ActivatedRoute,
        override apiService: ApiService,
        override router: Router,
        override modalService: ModalService,
        override cdr: ChangeDetectorRef,
        private teacherFormService: TeacherFormService,
    ) {
        super(route, apiService, router, modalService, cdr);
    }

    loadingSchools = true;

    override patchForm() {
        this.form.patchValue({
            firstName: this.item?.firstName,
            lastName: this.item?.lastName,
            schoolId: this.item?.school?.id,
        });
    }

    override initForm() {
        return this.teacherFormService.buildForm();
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}
