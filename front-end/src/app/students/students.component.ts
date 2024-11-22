import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api-service.service";

@Component({
	selector: "app-students",
	templateUrl: "./students.component.html",
	styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
	private readonly PATH = "student";

	students: any[] = [];

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.getStudents();
	}

	getStudents(): void {
		this.apiService.get(this.PATH).subscribe({
			next: (data) => {
				this.students = data as any;
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}
}
