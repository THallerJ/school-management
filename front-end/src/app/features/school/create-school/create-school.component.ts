import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../core/services/api-service.service";
import {
	FormGroup,
	ReactiveFormsModule,
	FormBuilder,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-create-school",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./create-school.component.html",
	styleUrl: "./create-school.component.css",
})
export class CreateSchoolComponent implements OnInit {
	createSchoolForm!: FormGroup;

	constructor(
		private apiService: ApiService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	initCreateSchoolForm() {
		this.createSchoolForm = this.formBuilder.group({
			name: ["", Validators.required],
			address: ["", Validators.required],
			phoneNumber: ["", Validators.required],
		});
	}
	ngOnInit() {
		this.initCreateSchoolForm();
	}

	createSchool() {
		const createdSchool = {
			name: this.createSchoolForm.value.name,
			address: this.createSchoolForm.value.address,
			phoneNumber: this.createSchoolForm.value.phoneNumber,
		};

		this.apiService.post<School>("school", createdSchool).subscribe(() => {
			this.router.navigate(["/schools"]);
		});
	}
}

type School = {
	name: string;
	address: string;
	phoneNumber: string;
};
