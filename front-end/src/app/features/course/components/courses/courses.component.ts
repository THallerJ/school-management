import { Component } from '@angular/core';
import { CourseDtoRespSchema, CourseDto } from '../../../../core/types';
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
export class CoursesComponent extends AbstractItemsListComponent<CourseDto> {
    override PATH = 'courses';
    override SCHEMA = CourseDtoRespSchema;
    override CREATE_ITEM_PATH = '/create-course';
}
