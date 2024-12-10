import { Component } from '@angular/core';
import { StudentDtoResp, StudentDtoRespSchema } from '../../../../core/types';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { StudentDtoPipe } from '../../pipes/student-dto.pipe';
import { AbstractItemsListComponent } from '../../../../core/components/abstract-items-list/abstract-items-list.component';
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
export class StudentsComponent extends AbstractItemsListComponent {
    private readonly PATH = 'students';
    students?: StudentDtoResp;

    getItems(): void {
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

    createItem() {
        this.router.navigate([`/create-student`]);
    }

    viewItem(id: number) {
        this.router.navigate([`/students/${id}`]);
    }
}
