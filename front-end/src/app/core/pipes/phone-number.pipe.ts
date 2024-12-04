import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumber',
    standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
    transform(phoneNumber: string): string {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
}
