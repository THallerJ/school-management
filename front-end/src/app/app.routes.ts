import { Routes } from '@angular/router';
import { StudentsComponent } from './features/student/components/students/students.component';
import { TeachersComponent } from './features/teacher/components/teachers/teachers.component';
import { CoursesComponent } from './features/course/components/courses/courses.component';
import { SchoolsComponent } from './features/school/components/schools/schools.component';
import { ViewSchoolComponent } from './features/school/components/view-school/view-school.component';
import { ViewStudentComponent } from './features/student/components/view-student/view-student.component';
import { ViewCourseComponent } from './features/course/components/view-course/view-course.component';
import { ViewTeacherComponent } from './features/teacher/components/view-teacher/view-teacher.component';
import { CreateSchoolComponent } from './features/school/components/create-school/create-school.component';
import { CreateStudentComponent } from './features/student/components/create-student/create-student.component';
import { CreateTeacherComponent } from './features/teacher/components/create-teacher/create-teacher.component';
import { CreateCourseComponent } from './features/course/components/create-course/create-course.component';

export const routes: Routes = [
    { path: 'students', component: StudentsComponent },
    { path: 'teachers', component: TeachersComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'schools', component: SchoolsComponent },
    { path: 'schools/:id', component: ViewSchoolComponent },
    { path: 'students/:id', component: ViewStudentComponent },
    { path: 'teachers/:id', component: ViewTeacherComponent },
    { path: 'courses/:id', component: ViewCourseComponent },
    { path: 'create-school', component: CreateSchoolComponent },
    { path: 'create-student', component: CreateStudentComponent },
    { path: 'create-teacher', component: CreateTeacherComponent },
    { path: 'create-course', component: CreateCourseComponent },
];
