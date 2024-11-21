import { Component, OnInit } from "@angular/core";
import { TeachersService } from "./teachers.service";

@Component({
	selector: "app-teachers",
	templateUrl: "./teachers.component.html",
	styleUrls: ["./teachers.component.css"],
})
export class TeachersComponent implements OnInit {
	teachers: any[] = [];

	constructor(private teacherService: TeachersService) {}

	ngOnInit(): void {
		this.getTeachers();
	}

	getTeachers(): void {
		this.teacherService
			.getTeachers()
			.subscribe((teachers) => (this.teachers = teachers));
	}
}
