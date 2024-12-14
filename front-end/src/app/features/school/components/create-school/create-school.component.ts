import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { AbstractCreateItemComponent } from '../../../../core/abstract/abstract-create-item/abstract-create-item.component';
import { SchoolFormComponent } from '../school-form/school-form.component';

@Component({
    selector: 'app-create-school',
    standalone: true,
    imports: [ReactiveFormsModule, FormValidatorComponent, SchoolFormComponent],
    templateUrl: './create-school.component.html',
    styleUrl: './create-school.component.css',
})
export class CreateSchoolComponent extends AbstractCreateItemComponent<CreatedSchool> {
    override PATH = 'schools';
    override REDIRECT = '/schools';

    override initForm() {
        this.form = this.formBuilder.group(
            {
                name: ['', Validators.required],
                address: ['', Validators.required],
                phoneNumber: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(10),
                        Validators.pattern(/^\d+$/),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }

    override getCreatedItem(): CreatedSchool {
        return {
            name: this.form.value.name,
            address: this.form.value.address,
            phoneNumber: this.form.value.phoneNumber,
        };
    }
}

type CreatedSchool = {
    name: string;
    address: string;
    phoneNumber: string;
};
