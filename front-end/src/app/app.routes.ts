import { Routes } from "@angular/router";
import { StudentsComponent } from "./students/students.component";
import { TeachersComponent } from "./teachers/teachers.component";
import { CoursesComponent } from "./courses/courses.component";
import { SchoolsComponent } from "./schools/schools.component";

export const routes: Routes = [
	{ path: "students", component: StudentsComponent },
	{ path: "teachers", component: TeachersComponent },
	{ path: "courses", component: CoursesComponent },
	{ path: "schools", component: SchoolsComponent },
];
