import { ApiService } from "./../../../core/services/api-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SchoolDto, SchoolDtoSchema } from "../../../core/types";
import { JsonPipe } from "@angular/common";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-view-school",
	standalone: true,
	imports: [JsonPipe, NgIf],
	templateUrl: "./view-school.component.html",
	styleUrl: "./view-school.component.css",
})
export class ViewSchoolComponent implements OnInit {
	private readonly PATH = "school";
	school?: SchoolDto;
	id?: number;
	loading = true;

	constructor(private route: ActivatedRoute, private apiService: ApiService) {}

	getSchool(id: number) {
		this.apiService.get(this.PATH, { id }).subscribe({
			next: (data) => {
				const result = SchoolDtoSchema.safeParse(data);
				if (result.success) this.school = result.data;
				this.loading = false;
			},
			error: (error) => {
				this.loading = false;
				if (error.status === 0) {
					return;
				}
			},
		});
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		if (this.id) this.getSchool(this.id);
	}
}

//this.ApiService.put<School>(this.PATH, {obj})
type School = {
	name?: string;
	address?: string;
	phoneNumber?: string;
};
