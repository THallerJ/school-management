import { Component } from '@angular/core';
import { StudentDto, StudentDtoRespSchema } from '../../../../core/types';
import { ConditionalMessageComponent } from './../../../../core/components/conditional-message/conditional-message.component';
import { ApiContentWrapperComponent } from '../../../../core/components/api-content-wrapper/api-content-wrapper.component';
import { ListItemComponent } from '../../../../core/components/list-item/list-item.component';
import { ItemListHeaderComponent } from '../../../../core/components/item-list-header/item-list-header.component';
import { StudentDtoPipe } from '../../pipes/student-dto.pipe';
import { AbstractItemsListComponent } from '../../../../core/abstract/abstract-items-list/abstract-items-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
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
        NgIf,
        AsyncPipe,
    ],
})
export class StudentsComponent extends AbstractItemsListComponent<StudentDto> {
    override PATH = 'students';
    override SCHEMA = StudentDtoRespSchema;
    override CREATE_ITEM_PATH = '/create-student';
}
