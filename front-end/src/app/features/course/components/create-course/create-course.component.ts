import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { SelectItemComponent } from '../../../../core/components/select-item/select-item.component';
@Component({
    selector: 'app-create-course',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputLabelComponent,
        FormValidatorComponent,
        SelectItemComponent,
    ],
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.css',
})
export class CreateCourseComponent extends AbstractCreateItemComponent<CreatedSchool> {
    override PATH = 'courses';
    override REDIRECT = '/courses';

    loadingSchools = true;
    loadingTeachers = true;

    override initForm(): void {
        this.form = this.formBuilder.group(
            {
                name: ['', Validators.required],
                school: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
                teacher: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
                credits: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.min(0),
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }

    override getCreatedItem(): CreatedSchool {
        return {
            name: this.form.value.name,
            credits: this.form.value.credits,
            schoolId: this.form.value.school,
            teacherId: this.form.value.teacher,
        };
    }

    finishLoadingTeachers() {
        this.loadingTeachers = false;
    }

    finishLoadingSchools() {
        this.loadingSchools = false;
    }
}

type CreatedSchool = {
    name: string;
    credits: number;
    schoolId: number;
    teacherId: number;
};
