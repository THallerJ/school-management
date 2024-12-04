import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service.service';
import { SchoolDtoRespSchema, SchoolDtoResp } from '../../../../core/types';
import { SchoolDtoPipe } from '../../pipes/school-dto.pipe';
import { Router } from '@angular/router';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
@Component({
    selector: 'app-schools',
    standalone: true,
    templateUrl: './schools.component.html',
    styleUrl: './schools.component.css',
    imports: [
        ItemListHeaderComponent,
        ListItemComponent,
        SchoolDtoPipe,
        ApiContentWrapperComponent,
    ],
})
export class SchoolsComponent implements OnInit {
    private readonly PATH = 'school';
    page = 1;
    readonly PAGE_SIZE = 20;
    schools: SchoolDtoResp = [];
    loading = true;

    constructor(
        private apiService: ApiService,
        private router: Router,
    ) {}

    getSchools() {
        const params = {
            params: { pageNumber: this.page, pageSize: this.PAGE_SIZE },
        };

        this.apiService.get(this.PATH, params).subscribe({
            next: data => {
                const result = SchoolDtoRespSchema.safeParse(data);
                if (result.success) {
                    if (this.page === 1) this.schools = result.data;
                    else if (result.data.length > 0)
                        this.schools = [...this.schools, ...result.data];

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

    createSchool() {
        this.router.navigate([`/create-school`]);
    }

    viewSchool(id: number) {
        this.router.navigate([`/schools/${id}`]);
    }

    ngOnInit() {
        this.getSchools();
    }
}
