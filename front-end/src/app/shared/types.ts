import zod from "zod";

// School==============================================================================

export const NestedStudentDtoSchema = zod.object({
	id: zod.number(),
	firstName: zod.string(),
	lastName: zod.string(),
});

export const RegistrationStudentDtoSchema = zod.object({
	Student: NestedStudentDtoSchema,
});

export const NestedTeacherDtoSchema = zod.object({
	id: zod.number(),
	firstName: zod.string(),
	lastName: zod.string(),
});

export const CourseNoSchoolDto = zod.object({
	id: zod.number(),
	name: zod.string(),
	teacher: NestedTeacherDtoSchema,
	registrations: zod.array(RegistrationStudentDtoSchema),
	credits: zod.number(),
});

export const SchoolDtoSchema = zod.object({
	id: zod.number(),
	name: zod.string(),
	courses: zod.array(CourseNoSchoolDto),
	address: zod.string(),
	phoneNumber: zod.string(),
});

export const SchoolDtoRespSchema = zod.array(SchoolDtoSchema);

export type SchoolDtoResp = zod.infer<typeof SchoolDtoRespSchema>;

// Teacher==============================================================================

export const CourseNoTeacherSchoolDto = zod.object({
	id: zod.number(),
	name: zod.string(),
	registrations: zod.array(RegistrationStudentDtoSchema),
	credits: zod.number(),
});

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
	courses: zod.array(CourseNoTeacherSchoolDto),
});

export type TeacherDto = zod.infer<typeof TeacherDtoSchema>;

export const TeacherDtoRespSchema = zod.array(TeacherDtoSchema);

export type TeacherDtoResp = zod.infer<typeof TeacherDtoRespSchema>;

// Course==============================================================================

export const CourseDto = zod.object({
	id: zod.number(),
	name: zod.string(),
	school: NestedSchoolDtoSchema,
	teacher: NestedTeacherDtoSchema,
	registrations: zod.array(RegistrationStudentDtoSchema),
	credits: zod.number(),
});

export const CourseDtoRespSchema = zod.array(CourseDto);

export type CourseDtoResp = zod.infer<typeof CourseDtoRespSchema>;

// Student==============================================================================

export const NestedCourseDtoSchema = zod.object({
	id: zod.number(),
	name: zod.string(),
	teacher: NestedTeacherDtoSchema,
	credits: zod.number(),
});

export const RegistractionCourseDtoSchema = zod.object({
	Course: NestedCourseDtoSchema,
});

export const StudentDtoSchema = zod.object({
	id: zod.number(),
	firstName: zod.string(),
	lastName: zod.string(),
	registrations: zod.array(RegistractionCourseDtoSchema),
	school: NestedSchoolDtoSchema,
});

export const StudentDtoRespSchema = zod.array(StudentDtoSchema);

export type StudentDtoResp = zod.infer<typeof StudentDtoRespSchema>;
