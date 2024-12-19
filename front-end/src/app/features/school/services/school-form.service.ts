import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceInterface } from '../../../core/interfaces/form-service-interface';

@Injectable({
    providedIn: 'root',
})
export class SchoolFormService implements FormServiceInterface {
    constructor(private formBuilder: FormBuilder) {}

    buildForm(): FormGroup {
        return this.formBuilder.group(
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
}
