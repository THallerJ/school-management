import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class StudentsService {
	private apiUrl = `${environment.apiUrl}/student`;

	constructor(private http: HttpClient) {}

	getStudents(params?: GetStudentFilter): Observable<any> {
		return this.http.get(this.apiUrl, { params });
	}

	getStudent(id: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${id}`);
	}

	createStudent(student: any): Observable<any> {
		return this.http.post(this.apiUrl, student);
	}

	updateStudent(id: number, student: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/${id}`, student);
	}

	deleteStudent(id: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}

type GetStudentFilter = {
	firstName?: string;
	lastName?: string;
	schoolId?: number;
	pageNumber?: number;
	pageSize?: number;
};
