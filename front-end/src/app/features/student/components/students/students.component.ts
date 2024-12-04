import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service.service';
import { StudentDtoRespSchema, StudentDtoResp } from '../../../../core/types';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
    private readonly PATH = 'student';

    students: StudentDtoResp = [];

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents(): void {
        this.apiService.get(this.PATH).subscribe({
            next: data => {
                const result = StudentDtoRespSchema.safeParse(data);
                if (result.success) this.students = result.data;
            },
            error: error => {
                if (error.status === 0) {
                    return;
                }
            },
        });
    }
}
