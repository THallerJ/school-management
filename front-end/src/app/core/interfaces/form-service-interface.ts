import { FormGroup } from '@angular/forms';

export interface FormServiceInterface {
    buildForm(): FormGroup;
}
