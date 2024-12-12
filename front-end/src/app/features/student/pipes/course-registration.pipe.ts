import { Pipe, PipeTransform } from '@angular/core';
import { Item, NestedCourseDto } from '../../../core/types';

@Pipe({
    name: 'courseRegistration',
    standalone: true,
})
export class CourseRegistrationPipe implements PipeTransform {
    transform(course: NestedCourseDto): Item {
        return {
            id: course.id,
            properties: [
                course.name,
                `${course.teacher.firstName} ${course.teacher.lastName}`,
                course.credits.toString(),
            ],
        };
    }
}
