import { Pipe, PipeTransform } from '@angular/core';
import { CourseNoTeacherSchoolDto, Item } from '../../../core/types';

@Pipe({
    name: 'courseNoTeacher',
    standalone: true,
})
export class CourseNoTeacherPipe implements PipeTransform {
    transform(course: CourseNoTeacherSchoolDto): Item {
        return {
            id: course.id,
            properties: [course.name, course.credits.toString()],
        };
    }
}
