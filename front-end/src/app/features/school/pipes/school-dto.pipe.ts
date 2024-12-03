import { Pipe, PipeTransform } from "@angular/core";
import { SchoolDto, Item } from "../../../core/types";
import { PhoneNumberPipe } from "../../../core/pipes/phone-number.pipe";
@Pipe({
	name: "schoolDto",
	standalone: true,
})
export class SchoolDtoPipe implements PipeTransform {
	constructor(private phoneNumberPipe: PhoneNumberPipe) {}
	transform(school: SchoolDto): Item {
		return {
			id: school.id,
			properties: [
				school.name,
				school.address,
				this.phoneNumberPipe.transform(school.phoneNumber),
			],
		};
	}
}
