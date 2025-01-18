import { Component } from '@angular/core';
import { SchoolDtoRespSchema, SchoolDto } from '../../../../core/types';
import { SchoolDtoPipe } from '../../pipes/school-dto.pipe';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ConditionalMessageComponent } from '../../../../core/components/conditional-message/conditional-message.component';
import { AbstractItemsListComponent } from '../../../../core/abstract/abstract-items-list/abstract-items-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
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
        NgIf,
        AsyncPipe,
    ],
})
export class SchoolsComponent extends AbstractItemsListComponent<SchoolDto> {
    override PATH = 'schools';
    override SCHEMA = SchoolDtoRespSchema;
    override CREATE_ITEM_PATH = '/create-school';
}
