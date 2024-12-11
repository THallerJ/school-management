import { Component } from '@angular/core';
import { SchoolDtoNoPagingRespSchema, SchoolDtoNoPaging } from './../../types';
import { SelectLabelComponent } from '../select-label/select-label.component';
import { SchoolDtoNoPagingPipe } from './school-dto-no-paging.pipe';
import { AbstractSelectItemComponent } from '../abstract-select-item/abstract-select-item.component';

@Component({
    selector: 'app-school-select',
    standalone: true,
    imports: [SelectLabelComponent, SchoolDtoNoPagingPipe],
    templateUrl: './school-select.component.html',
    styleUrl: './school-select.component.css',
})
export class SchoolSelectComponent extends AbstractSelectItemComponent<SchoolDtoNoPaging> {
    override SCHEMA = SchoolDtoNoPagingRespSchema;
    override PATH = 'schools';
}
