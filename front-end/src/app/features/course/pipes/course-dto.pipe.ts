import { Pipe, PipeTransform } from '@angular/core';
import { Item, CourseDto } from '../../../core/types';

@Pipe({
    name: 'courseDto',
    standalone: true,
})
export class CourseDtoPipe implements PipeTransform {
    transform(course: CourseDto): Item {
        return {
            id: course.id,
            properties: [
                course.name,
                `${course.teacher.firstName} ${course.teacher.lastName}`,
                course.school.name,
                course.credits.toString(),
            ],
        };
    }
}
