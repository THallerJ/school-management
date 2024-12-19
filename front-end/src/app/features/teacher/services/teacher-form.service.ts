import { Injectable } from '@angular/core';
import { FormServiceInterface } from '../../../core/interfaces/form-service-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class TeacherFormService implements FormServiceInterface {
    constructor(private formBuilder: FormBuilder) {}

    buildForm(): FormGroup {
        return this.formBuilder.group(
            {
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
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
