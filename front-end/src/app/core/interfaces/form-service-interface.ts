import { FormGroup, FormBuilder } from '@angular/forms';

export interface FormServiceInterface {
    buildForm(ormBuilder: FormBuilder): FormGroup;
}
