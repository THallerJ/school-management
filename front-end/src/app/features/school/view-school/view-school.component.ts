import { ApiService } from "./../../../core/services/api-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SchoolDto, SchoolDtoSchema } from "../../../core/types";
import { JsonPipe } from "@angular/common";
import { NgIf } from "@angular/common";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { ModelFormGroup } from "../../../core/types";

@Component({
	selector: "app-view-school",
	standalone: true,
	imports: [JsonPipe, NgIf, ReactiveFormsModule],
	templateUrl: "./view-school.component.html",
	styleUrl: "./view-school.component.css",
})
export class ViewSchoolComponent implements OnInit {
	private readonly PATH = "school";
	school?: SchoolDto;
	id?: number;
	loading = true;
	schoolForm: ModelFormGroup<School> = new FormGroup({
		name: new FormControl(),
		address: new FormControl(),
		phoneNumber: new FormControl(),
	});

	constructor(private route: ActivatedRoute, private apiService: ApiService) {}

	patchUpdateForm() {
		this.schoolForm.patchValue({
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

	updateSchool() {
		console.log(this.schoolForm.value);
		if (this.id && this.school)
			this.apiService
				.put<School>(this.PATH, this.id, this.school)
				.subscribe((data) => console.log(data));
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		if (this.id) this.getSchool(this.id);
	}
}

type School = {
	name: string;
	address: string;
	phoneNumber: string;
};
