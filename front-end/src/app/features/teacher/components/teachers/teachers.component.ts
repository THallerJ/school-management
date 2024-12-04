import { ApiService } from '../../../../core/services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { TeacherDtoRespSchema, TeacherDtoResp } from '../../../../core/types';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
    private readonly PATH = 'teacher';
    teachers: TeacherDtoResp = [];

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getTeachers();
    }

    getTeachers(): void {
        this.apiService.get(this.PATH).subscribe({
            next: data => {
                const result = TeacherDtoRespSchema.safeParse(data);
                if (result.success) this.teachers = result.data;
            },
            error: error => {
                if (error.status === 0) {
                    return;
                }
            },
        });
    }
}
