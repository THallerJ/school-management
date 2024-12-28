import { TeacherDto } from './../../../../core/types';
import { Component } from '@angular/core';
import { TeacherDtoRespSchema } from '../../../../core/types';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { TeacherDtoPipe } from '../../pipes/teacher-dto.pipe';
import { AbstractItemsListComponent } from '../../../../core/abstract/abstract-items-list/abstract-items-list.component';
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
export class TeachersComponent extends AbstractItemsListComponent<TeacherDto> {
    override PATH = 'teachers';
    override SCHEMA = TeacherDtoRespSchema;
    override CREATE_ITEM_PATH = '/create-teacher';
}
