import { ApiService } from '../../../../core/services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { StudentDtoResp, StudentDtoRespSchema } from '../../../../core/types';
import { Router } from '@angular/router';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { StudentDtoPipe } from '../../pipes/student-dto.pipe';
@Component({
    selector: 'app-students',
    standalone: true,
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
    imports: [
        ConditionalMessageComponent,
        ApiContentWrapperComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        StudentDtoPipe,
    ],
})
export class StudentsComponent implements OnInit {
    private readonly PATH = 'students';
    loading = true;
    page = 1;
    readonly PAGE_SIZE = 20;
    students?: StudentDtoResp;

    constructor(
        private apiService: ApiService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents(): void {
        this.apiService.get(this.PATH).subscribe({
            next: data => {
                const result = StudentDtoRespSchema.safeParse(data);
                if (result.success) {
                    if (this.page === 1) this.students = result.data;
                    else if (result.data.length > 0 && this.students)
                        this.students = [...this.students, ...result.data];

                    this.page = this.page + 1;

                    this.students = result.data;
                }

                this.loading = false;
            },
            error: error => {
                this.loading = false;

                if (error.status === 0) {
                    return;
                }
            },
        });
    }

    createStudent() {
        this.router.navigate([`/create-student`]);
    }

    viewStudent(id: number) {
        this.router.navigate([`/students/${id}`]);
    }
}
