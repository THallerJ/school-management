import { ModalService } from "./../../../core/services/modal-service.service";
import { ApiService } from "./../../../core/services/api-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SchoolDto, SchoolDtoSchema } from "../../../core/types";
import {
	ReactiveFormsModule,
	FormGroup,
	FormBuilder,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "../../../core/components/confirmation-modal/confirmation-modal.component";
import { FormValidatorComponent } from "../../../core/components/form-validator/form-validator.component";
@Component({
	selector: "app-view-school",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		ConfirmationModalComponent,
		FormValidatorComponent,
	],
	templateUrl: "./view-school.component.html",
	styleUrl: "./view-school.component.css",
})
export class ViewSchoolComponent implements OnInit {
	private readonly PATH = "school";
	school?: SchoolDto;
	id?: number;
	loading = true;
	updateSchoolForm!: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private router: Router,
		private modalService: ModalService,
		private formBuilder: FormBuilder
	) {}

	patchUpdateForm() {
		this.updateSchoolForm.patchValue({
			name: this.school?.name,
			address: this.school?.address,
			phoneNumber: this.school?.phoneNumber,
		});
	}

	getSchool(id: number) {
		this.apiService.get(this.PATH, { id }).subscribe({
			next: (data) => {
				const result = SchoolDtoSchema.safeParse(data);
				if (result.success) this.school = result.data;
				this.loading = false;
				this.patchUpdateForm();
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				} else {
					this.loading = false;
				}
			},
		});
	}

	openModal() {
		this.modalService.openModal();
	}

	onDelete = () => {
		if (this.id) {
			this.apiService.delete(this.PATH, this.id).subscribe();
			this.router.navigate(["/schools"]);
		}

		this.router.navigate(["/schools"]);
	};

	updateSchool() {
		const updatedSchool = {
			name: this.updateSchoolForm.value.name,
			address: this.updateSchoolForm.value.address,
			phoneNumber: this.updateSchoolForm.value.phoneNumber,
		};

		this.updateSchoolForm.markAsTouched();

		if (this.updateSchoolForm.valid && this.id && this.school) {
			this.apiService
				.put<School>(this.PATH, this.id, updatedSchool)
				.subscribe();
		}
	}

	initId() {
		this.id = this.route.snapshot.params["id"];
		if (this.id) this.getSchool(this.id);
	}

	initCreateSchoolForm() {
		this.updateSchoolForm = this.formBuilder.group(
			{
				name: ["", Validators.minLength(3)],
				address: ["", Validators.minLength(3)],
				phoneNumber: [
					"",
					Validators.compose([
						Validators.minLength(10),
						Validators.maxLength(10),
						Validators.pattern(/^\d+$/),
					]),
				],
			},
			{ updateOn: "submit" }
		);
	}

	ngOnInit() {
		this.initId();
		this.initCreateSchoolForm();
	}
}

type School = {
	name?: string;
	address?: string;
	phoneNumber?: string;
};
