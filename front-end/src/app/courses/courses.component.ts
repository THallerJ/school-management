import { ApiService } from "./../shared/api-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-courses",
	templateUrl: "./courses.component.html",
	styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
	private readonly PATH = "course";
	courses: any[] = [];

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.getCourses();
	}

	getCourses(): void {
		this.apiService.get(this.PATH).subscribe({
			next: (data) => {
				this.courses = data as any;
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}
}
