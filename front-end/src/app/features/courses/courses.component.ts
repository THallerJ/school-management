import { ApiService } from "../../core/api-service.service";
import { Component, OnInit } from "@angular/core";
import { CourseDtoRespSchema, CourseDtoResp } from "../../core/types";

@Component({
	selector: "app-courses",
	templateUrl: "./courses.component.html",
	styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
	private readonly PATH = "course";
	courses: CourseDtoResp = [];

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.getCourses();
	}

	getCourses(): void {
		this.apiService.get(this.PATH).subscribe({
			next: (data) => {
				const result = CourseDtoRespSchema.safeParse(data);
				if (result.success) this.courses = result.data;
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}
}
