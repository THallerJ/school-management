import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormServiceInterface } from '../../../core/interfaces/form-service-interface';

@Injectable({
    providedIn: 'root',
})
export class CourseFormService implements FormServiceInterface {
    constructor() {}

    buildForm(formBuilder: FormBuilder) {
        return formBuilder.group(
            {
                name: ['', Validators.required],
                schoolId: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[0-9]*$'),
                    ]),
                ],
                teacherId: [
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
}
