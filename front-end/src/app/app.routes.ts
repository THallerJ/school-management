import { Routes } from "@angular/router";
import { StudentsComponent } from "./features/students/students.component";
import { TeachersComponent } from "./features/teachers/teachers.component";
import { CoursesComponent } from "./features/courses/courses.component";
import { SchoolsComponent } from "./features/schools/schools.component";

export const routes: Routes = [
	{ path: "students", component: StudentsComponent },
	{ path: "teachers", component: TeachersComponent },
	{ path: "courses", component: CoursesComponent },
	{ path: "schools", component: SchoolsComponent },
];
