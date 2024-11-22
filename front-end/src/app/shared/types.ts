import zod from "zod";

// SCHOOL==============================================================================

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

// TEACHER==============================================================================

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
