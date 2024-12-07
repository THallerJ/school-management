import { Pipe, PipeTransform } from '@angular/core';
import { SchoolDtoNoPagingResp, SelectOption } from '../../../core/types';

@Pipe({
    name: 'schoolDtoNoPaging',
    standalone: true,
})
export class SchoolDtoNoPagingPipe implements PipeTransform {
    transform(schools: SchoolDtoNoPagingResp): SelectOption[] {
        return schools.map(school => ({
            value: school.id.toString(),
            label: school.name,
        }));
    }
}
