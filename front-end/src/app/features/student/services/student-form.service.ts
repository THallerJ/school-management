import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceInterface } from '../../../core/interfaces/form-service-interface';

@Injectable({
    providedIn: 'root',
})
export class StudentFormService implements FormServiceInterface {
    constructor(private formBuilder: FormBuilder) {}

    buildForm(): FormGroup {
        return this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: [
                    '',
                    Validators.compose([Validators.required, Validators.email]),
                ],
                schoolId: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
            },
            { updateOn: 'submit' },
        );
    }
}
