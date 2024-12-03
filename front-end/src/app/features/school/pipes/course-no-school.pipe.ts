import { Pipe, PipeTransform } from "@angular/core";
import { CourseNoSchoolDto, Item } from "../../../core/types";

@Pipe({
	name: "courseNoSchool",
	standalone: true,
})
export class CourseNoSchoolPipe implements PipeTransform {
	transform(course: CourseNoSchoolDto): Item {
		return {
			id: course.id,
			properties: [
				course.name,
				course.teacher.firstName + " " + course.teacher.lastName,
				course.credits.toString(),
			],
		};
	}
}
