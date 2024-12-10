import { Pipe, PipeTransform } from '@angular/core';
import { Item, StudentDto } from '../../../core/types';

@Pipe({
    name: 'studentDto',
    standalone: true,
})
export class StudentDtoPipe implements PipeTransform {
    transform(student: StudentDto): Item {
        return {
            id: student.id,
            properties: [
                student.firstName,
                student.lastName,
                student.school.name,
            ],
        };
    }
}
