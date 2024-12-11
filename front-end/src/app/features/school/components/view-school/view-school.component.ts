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
import { AbstractViewItemComponent } from '../../../../core/components/abstract-view-item/abstract-view-item.component';
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
    ],
    templateUrl: './view-school.component.html',
    styleUrl: './view-school.component.css',
})
export class ViewSchoolComponent extends AbstractViewItemComponent<SchoolDto> {
    private readonly PATH = 'schools';

    patchForm() {
        this.form.patchValue({
            name: this.item?.name,
            address: this.item?.address,
            phoneNumber: this.item?.phoneNumber,
        });
    }

    getItem(id: number) {
        this.apiService.get(this.PATH, { id }).subscribe({
            next: data => {
                const result = SchoolDtoSchema.safeParse(data);
                if (result.success) this.item = result.data;
                this.loading = false;
                this.patchForm();
            },
            error: error => {
                this.loading = false;

                if (error.status === 0) {
                    return;
                }
            },
        });
    }

    onDelete = () => {
        if (this.id) {
            this.apiService.delete(this.PATH, this.id).subscribe();
        }

        this.router.navigate(['/schools']);
    };

    updateItem() {
        const updatedSchool = {
            name: this.form.value.name,
            address: this.form.value.address,
            phoneNumber: this.form.value.phoneNumber,
        };

        this.form.markAsTouched();

        if (this.form.valid && this.id && this.item) {
            this.apiService
                .put<School>(this.PATH, this.id, updatedSchool)
                .subscribe(() => {
                    this.router.navigate(['/schools']);
                });
        }
    }

    initForm() {
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
}

type School = {
    name?: string;
    address?: string;
    phoneNumber?: string;
};
