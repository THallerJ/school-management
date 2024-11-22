import { ApiService } from "./../shared/api-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-teachers",
	templateUrl: "./teachers.component.html",
	styleUrls: ["./teachers.component.css"],
})
export class TeachersComponent implements OnInit {
	private readonly PATH = "teacher";
	teachers: any[] = [];

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.getTeachers();
	}

	getTeachers(): void {
		this.apiService.get(this.PATH).subscribe({
			next: (data) => {
				this.teachers = data as any;
			},
			error: (error) => {
				if (error.status === 0) {
					return;
				}
			},
		});
	}
}
