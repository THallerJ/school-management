import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) {}

    get(path: string, options?: GetOptions): Observable<unknown> {
        const id = options?.id ?? '';
        const params = options?.params || {};
        const url = `${this.apiUrl}/${path}/${id}`;

        return this.http.get(url, { params });
    }

    post<T>(path: string, data: T): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/${path}`, data);
    }

    put<T>(path: string, id: number, data: T): Observable<unknown> {
        return this.http.put(`${this.apiUrl}/${path}/${id}`, data);
    }

    delete(path: string, id: number): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/${path}/${id}`);
    }
}

type GetOptions = {
    id?: number;
    params?: Params;
};

type Params = {
    pageNumber?: number;
    pageSize?: number;
    disablePaging?: boolean;
};
