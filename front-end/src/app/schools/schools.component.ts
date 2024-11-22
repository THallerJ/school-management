import { Component } from "@angular/core";
import { ApiService } from "./../shared/api-service.service";
import { SchoolDtoRespSchema, SchoolDtoResp } from "../shared/types";

@Component({
	selector: "app-schools",
	standalone: true,
	imports: [],
	templateUrl: "./schools.component.html",
	styleUrl: "./schools.component.css",
})
export class SchoolsComponent {
	private readonly PATH = "school";

	schools: SchoolDtoResp = [];

	constructor(private apiService: ApiService) {}

	getSchools() {
		this.apiService.get(this.PATH).subscribe({
			next: (data) => {
				const result = SchoolDtoRespSchema.safeParse(data);
				if (result.success) this.schools = result.data;
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}

	//this.ApiService.put<School>(this.PATH, {obj})

	ngOnInit() {
		this.getSchools();
	}
}

type School = {
	name?: string;
	address?: string;
	phoneNumber?: string;
};
