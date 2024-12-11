import { Component } from '@angular/core';
import { CourseDtoRespSchema, CourseDtoResp } from '../../../../core/types';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { CourseDtoPipe } from './../../pipes/course-dto.pipe';
import { AbstractItemsListComponent } from '../../../../core/components/abstract-items-list/abstract-items-list.component';
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
export class CoursesComponent extends AbstractItemsListComponent<CourseDtoResp> {
    private readonly PATH = 'courses';

    getItems(): void {
        this.apiService.get(this.PATH).subscribe({
            next: data => {
                const result = CourseDtoRespSchema.safeParse(data);
                if (result.success) {
                    if (this.page === 1) this.items = result.data;
                    else if (result.data.length > 0 && this.items)
                        this.items = [...this.items, ...result.data];

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
        this.router.navigate([`/create-course`]);
    }

    viewItem(id: number) {
        this.router.navigate([`/courses/${id}`]);
    }
}
