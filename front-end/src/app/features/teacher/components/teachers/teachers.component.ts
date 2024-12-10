import { Component } from '@angular/core';
import { TeacherDtoRespSchema, TeacherDtoResp } from '../../../../core/types';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { TeacherDtoPipe } from '../../pipes/teacher-dto.pipe';
import { AbstractItemsListComponent } from '../../../../core/components/abstract-items-list/abstract-items-list.component';
@Component({
    selector: 'app-teachers',
    standalone: true,
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.css'],
    imports: [
        ConditionalMessageComponent,
        ApiContentWrapperComponent,
        ListItemComponent,
        ItemListHeaderComponent,
        TeacherDtoPipe,
    ],
})
export class TeachersComponent extends AbstractItemsListComponent {
    private readonly PATH = 'teachers';
    teachers?: TeacherDtoResp;

    getItems(): void {
        const params = {
            params: { pageNumber: this.page, pageSize: this.PAGE_SIZE },
        };

        this.apiService.get(this.PATH, params).subscribe({
            next: data => {
                const result = TeacherDtoRespSchema.safeParse(data);
                if (result.success) {
                    if (this.page === 1) this.teachers = result.data;
                    else if (result.data.length > 0 && this.teachers)
                        this.teachers = [...this.teachers, ...result.data];

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

    createItem() {
        this.router.navigate(['/create-teacher']);
    }

    viewItem(id: number) {
        this.router.navigate([`/teachers/${id}`]);
    }
}
