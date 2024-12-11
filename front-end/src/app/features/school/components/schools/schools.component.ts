import { Component } from '@angular/core';
import { SchoolDtoRespSchema, SchoolDtoResp } from '../../../../core/types';
import { SchoolDtoPipe } from '../../pipes/school-dto.pipe';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractItemsListComponent } from '../../../../core/components/abstract-items-list/abstract-items-list.component';
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
        ConditionalMessageComponent,
    ],
})
export class SchoolsComponent extends AbstractItemsListComponent<SchoolDtoResp> {
    private readonly PATH = 'schools';

    getItems() {
        const params = {
            params: { pageNumber: this.page, pageSize: this.PAGE_SIZE },
        };

        this.apiService.get(this.PATH, params).subscribe({
            next: data => {
                const result = SchoolDtoRespSchema.safeParse(data);
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
        this.router.navigate([`/create-school`]);
    }

    viewItem(id: number) {
        this.router.navigate([`/schools/${id}`]);
    }
}
