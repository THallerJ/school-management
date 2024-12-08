import { ModalService } from './../../../../core/services/modal-service.service';
import { ApiService } from './../../../../core/services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherDto, TeacherDtoSchema } from '../../../../core/types';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { ViewItemWrapperComponent } from '../../../../core/components/view-item-wrapper/view-item-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { SchoolSelectComponent } from './../../../../core/components/school-select/school-select.component';

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
    ],
    templateUrl: './view-teacher.component.html',
    styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent implements OnInit {
    private readonly PATH = 'teacher';
    id?: number;
    loadingTeacher = true;
    loadingSchools = true;
    updateTeacherForm!: FormGroup;
    teacher?: TeacherDto;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private router: Router,
        private modalService: ModalService,
        private formBuilder: FormBuilder,
    ) {}

    patchUpdateForm() {
        this.updateTeacherForm.patchValue({
            firstName: this.teacher?.firstName,
            lastName: this.teacher?.lastName,
            school: this.teacher?.school?.id,
        });
    }

    initCreateTeacherForm() {
        this.updateTeacherForm = this.formBuilder.group(
            {
                firstName: '',
                lastName: '',
                school: ['', Validators.pattern('^[0-9]*$')],
            },
            { updateOn: 'submit' },
        );
    }

    updateTeacher() {
        const createdTeacher = {
            firstName: this.updateTeacherForm.value.firstName,
            lastName: this.updateTeacherForm.value.lastName,
            schoolId: this.updateTeacherForm.value.school,
        };

        this.updateTeacherForm.markAsTouched();

        if (this.updateTeacherForm.valid && this.id) {
            createdTeacher['schoolId'] = Number(createdTeacher['schoolId']);

            this.apiService
                .put(this.PATH, this.id, createdTeacher)
                .subscribe(() => {
                    this.router.navigate(['/teachers']);
                });
        }
    }

    getTeacher(id: number) {
        this.apiService.get(this.PATH, { id }).subscribe({
            next: data => {
                const result = TeacherDtoSchema.safeParse(data);
                if (result.success) this.teacher = result.data;
                this.loadingTeacher = false;
                this.patchUpdateForm();
            },
            error: error => {
                if (error.status === 0) {
                    return;
                } else {
                    this.loadingTeacher = false;
                }
            },
        });
    }

    onDelete = () => {
        if (this.id) {
            this.apiService.delete(this.PATH, this.id).subscribe();
        }

        this.router.navigate(['/teachers']);
    };

    finishLoadingSchools() {
        this.loadingSchools = false;
    }

    openModal() {
        this.modalService.openModal();
    }

    initId() {
        this.id = this.route.snapshot.params['id'];
        if (this.id) this.getTeacher(this.id);
    }

    ngOnInit() {
        this.initId();
        this.initCreateTeacherForm();
    }
}

type Teacher = {
    firstName?: string;
    lastName?: string;
    schoolId?: number;
};
