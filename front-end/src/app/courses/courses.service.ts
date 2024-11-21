import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class CoursesService {
	private apiUrl = `${environment.apiUrl}/course`;

	constructor(private http: HttpClient) {}

	getCourses(params?: GetCourseFilter): Observable<any> {
		return this.http.get(this.apiUrl, { params });
	}

	getCourse(id: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${id}`);
	}

	createCourse(course: any): Observable<any> {
		return this.http.post(this.apiUrl, course);
	}

	updateCourse(id: number, course: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/${id}`, course);
	}

	deleteCourse(id: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}

type GetCourseFilter = {
	name?: string;
	credits?: number;
	teacherId?: number;
	schoolId?: number;
	pageNumber?: number;
	pageSize?: number;
};
