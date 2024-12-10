import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorComponent } from '../../../../core/components/form-validator/form-validator.component';
import { InputLabelComponent } from '../../../../core/components/input-label/input-label.component';
import { AbstractCreateItemComponent } from '../../../../core/components/abstract-create-item/abstract-create-item.component';
@Component({
    selector: 'app-create-school',
    standalone: true,
    imports: [ReactiveFormsModule, FormValidatorComponent, InputLabelComponent],
    templateUrl: './create-school.component.html',
    styleUrl: './create-school.component.css',
})
export class CreateSchoolComponent extends AbstractCreateItemComponent {
    private readonly PATH = 'schools';

    initForm() {
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

    createItem() {
        const createdSchool = {
            name: this.form.value.name,
            address: this.form.value.address,
            phoneNumber: this.form.value.phoneNumber,
        };

        this.form.markAsTouched();

        if (this.form.valid) {
            this.apiService
                .post<School>(this.PATH, createdSchool)
                .subscribe(() => {
                    this.router.navigate(['/schools']);
                });
        }
    }
}

type School = {
    name: string;
    address: string;
    phoneNumber: string;
};
