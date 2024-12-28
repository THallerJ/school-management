import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        const getParams = options?.params || {};
        const url = `${this.apiUrl}/${path}/${id}`;

        const params = new HttpParams({ fromObject: { ...getParams } });

        return this.http.get(url, { params });
    }

    post<T>(path: string, data: T): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/${path}`, data);
    }

    put<T>(path: string, id: number, data: T): Observable<unknown> {
        return this.http.put(`${this.apiUrl}/${path}/${id}`, data);
    }

    delete<T>(path: string, options: DeleteOptions<T>): Observable<unknown> {
        const url = `${this.apiUrl}/${path}`;
        if (options.id) return this.http.delete(`${url}/${options.id}`);
        else
            return this.http.delete(`${url}`, {
                body: options.body,
            });
    }
}

interface GetOptions {
    id?: number;
    params?: Params;
}

interface DeleteOptions<T> {
    id?: number;
    body?: T;
}

interface Params {
    pageNumber?: number;
    pageSize?: number;
    disablePaging?: boolean;
}
