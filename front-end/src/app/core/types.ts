import zod from 'zod';
import { FormControl } from '@angular/forms';

// School==============================================================================

export const NestedStudentDtoSchema = zod.object({
    id: zod.number(),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string(),
});

export type NestedStudentDto = zod.infer<typeof NestedStudentDtoSchema>;

export const RegistrationStudentDtoSchema = zod.object({
    student: NestedStudentDtoSchema.optional(),
});

export const NestedTeacherDtoSchema = zod.object({
    id: zod.number(),
    firstName: zod.string(),
    lastName: zod.string(),
});

export const CourseNoSchoolDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    teacher: NestedTeacherDtoSchema,
    registrations: zod.array(RegistrationStudentDtoSchema),
    credits: zod.number(),
});

export type CourseNoSchoolDto = zod.infer<typeof CourseNoSchoolDtoSchema>;

export const SchoolDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    courses: zod.array(CourseNoSchoolDtoSchema),
    address: zod.string(),
    phoneNumber: zod.string(),
});

export type SchoolDto = zod.infer<typeof SchoolDtoSchema>;

export const SchoolDtoRespSchema = zod.array(SchoolDtoSchema);

export type SchoolDtoResp = zod.infer<typeof SchoolDtoRespSchema>;

// Teacher==============================================================================

export const CourseNoTeacherSchoolDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    registrations: zod.array(RegistrationStudentDtoSchema),
    credits: zod.number(),
});

export type CourseNoTeacherSchoolDto = zod.infer<
    typeof CourseNoTeacherSchoolDtoSchema
>;

export const NestedSchoolDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    address: zod.string(),
    phoneNumber: zod.string(),
});

export const TeacherDtoSchema = zod.object({
    id: zod.number(),
    firstName: zod.string(),
    lastName: zod.string(),
    school: NestedSchoolDtoSchema,
    courses: zod.array(CourseNoTeacherSchoolDtoSchema),
});

export type TeacherDto = zod.infer<typeof TeacherDtoSchema>;

export const TeacherDtoRespSchema = zod.array(TeacherDtoSchema);

export type TeacherDtoResp = zod.infer<typeof TeacherDtoRespSchema>;

// Course==============================================================================

export const CourseDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    school: NestedSchoolDtoSchema,
    teacher: NestedTeacherDtoSchema,
    registrations: zod.array(RegistrationStudentDtoSchema),
    credits: zod.number(),
});

export type CourseDto = zod.infer<typeof CourseDtoSchema>;

export const CourseDtoRespSchema = zod.array(CourseDtoSchema);

export type CourseDtoResp = zod.infer<typeof CourseDtoRespSchema>;

// Student==============================================================================

export const NestedCourseDtoSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    teacher: NestedTeacherDtoSchema,
    credits: zod.number(),
});

export type NestedCourseDto = zod.infer<typeof NestedCourseDtoSchema>;

export const RegistractionCourseDtoSchema = zod.object({
    course: NestedCourseDtoSchema.optional(),
});

export const StudentDtoSchema = zod.object({
    id: zod.number(),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string(),
    registrations: zod.array(RegistractionCourseDtoSchema),
    school: NestedSchoolDtoSchema,
});

export type StudentDto = zod.infer<typeof StudentDtoSchema>;

export const StudentDtoRespSchema = zod.array(StudentDtoSchema);

export type StudentDtoResp = zod.infer<typeof StudentDtoRespSchema>;

// Misc ===============================================================================

export type FormGroupType<T> = {
    [K in keyof T]: FormControl<T[K]>;
};

export interface Item {
    id: number;
    properties: string[];
}

export interface SelectOption { value: string; label: string }

export const ItemNoPagingSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
});

export const ItemsNoPagingRespSchema = zod.array(ItemNoPagingSchema);

export type ItemNoPaging = zod.infer<typeof ItemNoPagingSchema>;

export type ItemsNoPagingResp = zod.infer<typeof ItemsNoPagingRespSchema>;

export interface AddRegistration { courseId: number; studentId: number }
