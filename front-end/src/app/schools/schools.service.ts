import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class SchoolsService {
	private apiUrl = `${environment.apiUrl}/school`;

	constructor(private http: HttpClient) {}

	getSchools(params?: GetSchoolFilter): Observable<any> {
		return this.http.get(this.apiUrl, { params });
	}

	getSchool(id: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${id}`);
	}

	createSchool(school: any): Observable<any> {
		return this.http.post(this.apiUrl, school);
	}

	updateSchool(id: number, school: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/${id}`, school);
	}

	deleteSchool(id: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}

type GetSchoolFilter = {
	pageNumber?: number;
	pageSize?: number;
	name?: string;
	address?: string;
	phoneNumber?: string;
};
