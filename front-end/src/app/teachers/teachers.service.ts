import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class TeachersService {
	private apiUrl = `${environment.apiUrl}/teacher`;

	constructor(private http: HttpClient) {}

	getTeachers(params?: GetTeacherFilter): Observable<any> {
		return this.http.get(this.apiUrl, { params });
	}

	getTeacher(id: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${id}`);
	}

	createTeacher(teacher: any): Observable<any> {
		return this.http.post(this.apiUrl, teacher);
	}

	updateTeacher(id: number, teacher: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/${id}`, teacher);
	}

	deleteTeacher(id: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}

type GetTeacherFilter = {
	firstName?: string;
	lastName?: string;
	schoolId?: number;
	pageNumber?: number;
	pageSize?: number;
};
