import zod from "zod";

export const NestedStudentDtoSchema = zod.object({
	id: zod.number(),
	firstName: zod.string(),
	lastName: zod.string(),
});

export type NestedStudentDto = zod.infer<typeof NestedStudentDtoSchema>;

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

export type SchoolDto = zod.infer<typeof SchoolDtoSchema>;

export const SchoolDtoRespSchema = zod.array(SchoolDtoSchema);

export type SchoolDtoResp = zod.infer<typeof SchoolDtoRespSchema>;
