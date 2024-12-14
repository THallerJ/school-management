import { Pipe, PipeTransform } from '@angular/core';
import { NestedStudentDto, Item } from '../../../core/types';

@Pipe({
    name: 'studentRegistration',
    standalone: true,
})
export class StudentRegistrationPipe implements PipeTransform {
    transform(student: NestedStudentDto): Item {
        return {
            id: student.id,
            properties: [student.firstName, student.lastName],
        };
    }
}
