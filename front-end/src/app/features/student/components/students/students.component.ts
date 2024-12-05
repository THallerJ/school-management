import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service.service';
import { StudentDtoRespSchema, StudentDtoResp } from '../../../../core/types';
import { Router } from '@angular/router';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';

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
    ],
})
export class StudentsComponent implements OnInit {
    private readonly PATH = 'student';
    loading = true;
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
                if (result.success) this.students = result.data;
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
}
