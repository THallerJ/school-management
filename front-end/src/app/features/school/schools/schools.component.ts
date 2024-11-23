import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../core/services/api-service.service";
import { SchoolDtoRespSchema, SchoolDtoResp } from "../../../core/types";
import { PhoneNumberPipe } from "../../../core/pipes/phone-number.pipe";
@Component({
	selector: "app-schools",
	standalone: true,
	templateUrl: "./schools.component.html",
	styleUrl: "./schools.component.css",
	imports: [PhoneNumberPipe],
})
export class SchoolsComponent implements OnInit {
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
