import { ApiService } from '../../../../core/services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { CourseDtoRespSchema, CourseDtoResp } from '../../../../core/types';
import { Router } from '@angular/router';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { CourseDtoPipe } from './../../pipes/course-dto.pipe';
@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        ApiContentWrapperComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        ConditionalMessageComponent,
        CourseDtoPipe,
    ],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
    private readonly PATH = 'courses';
    courses?: CourseDtoResp;
    page = 1;
    readonly PAGE_SIZE = 20;
    loading = true;

    constructor(
        private apiService: ApiService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getCourses();
    }

    getCourses(): void {
        this.apiService.get(this.PATH).subscribe({
            next: data => {
                const result = CourseDtoRespSchema.safeParse(data);
                if (result.success) {
                    if (this.page === 1) this.courses = result.data;
                    else if (result.data.length > 0 && this.courses)
                        this.courses = [...this.courses, ...result.data];

                    this.page = this.page + 1;
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

    createCourse() {
        this.router.navigate([`/create-course`]);
    }

    viewCourse(id: number) {
        this.router.navigate([`/courses/${id}`]);
    }
}
