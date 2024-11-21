import { Component, inject } from "@angular/core";
import { SchoolsService } from "./schools.service";

@Component({
	selector: "app-schools",
	standalone: true,
	imports: [],
	templateUrl: "./schools.component.html",
	styleUrl: "./schools.component.css",
})
export class SchoolsComponent {
	schools: any[] = [];

	private schoolService = inject(SchoolsService);

	getSchools() {
		this.schoolService.getSchools().subscribe((data) => {
			this.schools = data;
		});
	}

	ngOnInit() {
		this.getSchools();
	}
}
