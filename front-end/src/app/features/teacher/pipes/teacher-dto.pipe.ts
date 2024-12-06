import { Pipe, PipeTransform } from '@angular/core';
import { TeacherDto, Item } from '../../../core/types';

@Pipe({
    name: 'teacherDto',
    standalone: true,
})
export class TeacherDtoPipe implements PipeTransform {
    transform(teacher: TeacherDto): Item {
        return {
            id: teacher.id,
            properties: [
                teacher.firstName,
                teacher.lastName,
                teacher.school.name,
            ],
        };
    }
}
