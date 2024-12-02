import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-form-validator",
	standalone: true,
	imports: [],
	templateUrl: "./form-validator.component.html",
	styleUrl: "./form-validator.component.css",
})
export class FormValidatorComponent {
	@Input() form!: FormGroup;
}
