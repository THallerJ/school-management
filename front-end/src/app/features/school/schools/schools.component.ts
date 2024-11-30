import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../core/services/api-service.service";
import { SchoolDtoRespSchema, SchoolDtoResp } from "../../../core/types";
import { PhoneNumberPipe } from "../../../core/pipes/phone-number.pipe";
import { Router } from "@angular/router";

@Component({
	selector: "app-schools",
	standalone: true,
	templateUrl: "./schools.component.html",
	styleUrl: "./schools.component.css",
	imports: [PhoneNumberPipe],
})
export class SchoolsComponent implements OnInit {
	private readonly PATH = "school";
	page = 1;

	schools: SchoolDtoResp = [];

	constructor(private apiService: ApiService, private router: Router) {}

	getSchools() {
		const params = { params: { pageNumber: this.page } };

		this.apiService.get(this.PATH, params).subscribe({
			next: (data) => {
				const result = SchoolDtoRespSchema.safeParse(data);
				if (result.success) {
					if (this.page === 1) this.schools = result.data;
					else if (result.data.length > 0)
						this.schools = [...this.schools, ...result.data];

					this.page = this.page + 1;
				}
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}

	createSchool() {
		this.router.navigate([`/create-school`]);
	}

	viewSchool(id: number) {
		this.router.navigate([`/schools/${id}`]);
	}

	ngOnInit() {
		this.getSchools();
	}
}
