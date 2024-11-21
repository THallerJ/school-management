import { Component, OnInit } from "@angular/core";
import { CoursesService } from "./courses.service";

@Component({
	selector: "app-courses",
	templateUrl: "./courses.component.html",
	styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
	courses: any[] = [];

	constructor(private courseService: CoursesService) {}

	ngOnInit(): void {
		this.getCourses();
	}

	getCourses(): void {
		this.courseService
			.getCourses()
			.subscribe((courses) => (this.courses = courses));
	}
}
