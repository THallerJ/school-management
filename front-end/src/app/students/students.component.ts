import { Component, OnInit } from "@angular/core";
import { StudentsService } from "./students.service";

@Component({
	selector: "app-students",
	templateUrl: "./students.component.html",
	styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
	students: any[] = [];

	constructor(private studentService: StudentsService) {}

	ngOnInit(): void {
		this.getStudents();
	}

	getStudents(): void {
		this.studentService
			.getStudents()
			.subscribe((students) => (this.students = students));
	}
}
