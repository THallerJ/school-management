import { ModalService } from "./../../../core/services/modal-service.service";
import { ApiService } from "./../../../core/services/api-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroupType, SchoolDto, SchoolDtoSchema } from "../../../core/types";
import { NgIf } from "@angular/common";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "../../../core/components/confirmation-modal/confirmation-modal.component";

@Component({
	selector: "app-view-school",
	standalone: true,
	imports: [NgIf, ReactiveFormsModule, ConfirmationModalComponent],
	templateUrl: "./view-school.component.html",
	styleUrl: "./view-school.component.css",
})
export class ViewSchoolComponent implements OnInit {
	private readonly PATH = "school";
	school?: SchoolDto;
	id?: number;
	loading = true;

	updateSchoolForm = new FormGroup<FormGroupType<School>>({
		name: new FormControl(),
		address: new FormControl(),
		phoneNumber: new FormControl(),
	});

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private router: Router,
		private modalService: ModalService
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

		if (this.id && this.school)
			this.apiService
				.put<School>(this.PATH, this.id, updatedSchool)
				.subscribe();
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		if (this.id) this.getSchool(this.id);
	}
}

type School = {
	name?: string;
	address?: string;
	phoneNumber?: string;
};
