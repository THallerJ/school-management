import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class SchoolsService {
	private apiUrl = `${environment.apiUrl}/school`;
	http = inject(HttpClient);

	getSchools(params?: GetSchoolFilter): Observable<any> {
		return this.http.get(this.apiUrl, { params });
	}
}

type GetSchoolFilter = {
	pageNumber?: number;
	pageSize?: number;
	name?: string;
	address?: string;
	phoneNumber?: string;
};
