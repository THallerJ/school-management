import { Routes } from "@angular/router";
import { StudentsComponent } from "./features/student/students/students.component";
import { TeachersComponent } from "./features/teacher/teachers/teachers.component";
import { CoursesComponent } from "./features/course/courses/courses.component";
import { SchoolsComponent } from "./features/school/schools/schools.component";
import { ViewSchoolComponent } from "./features/school/view-school/view-school.component";
import { ViewStudentComponent } from "./features/student/view-student/view-student.component";
import { ViewCourseComponent } from "./features/course/view-course/view-course.component";
import { ViewTeacherComponent } from "./features/teacher/view-teacher/view-teacher.component";
import { CreateSchoolComponent } from "./features/school/create-school/create-school.component";
import { CreateStudentComponent } from "./features/student/create-student/create-student.component";
import { CreateTeacherComponent } from "./features/teacher/create-teacher/create-teacher.component";
import { CreateCourseComponent } from "./features/course/create-course/create-course.component";

export const routes: Routes = [
	{ path: "students", component: StudentsComponent },
	{ path: "teachers", component: TeachersComponent },
	{ path: "courses", component: CoursesComponent },
	{ path: "schools", component: SchoolsComponent },
	{ path: "schools/:id", component: ViewSchoolComponent },
	{ path: "students/:id", component: ViewStudentComponent },
	{ path: "teachers/:id", component: ViewTeacherComponent },
	{ path: "courses/:id", component: ViewCourseComponent },
	{ path: "create-school", component: CreateSchoolComponent },
	{ path: "create-student", component: CreateStudentComponent },
	{ path: "create-teacher", component: CreateTeacherComponent },
	{ path: "create-course", component: CreateCourseComponent },
];
