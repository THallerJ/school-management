using school_management.Dtos.Course;
using school_management.Models;

namespace school_management.Mappers
{
    public static class CourseMappers
    {
        public static CourseDto ToCourseDto(this Course course)
        {
            return new CourseDto
            {
                Id = course.Id,
                Name = course.Name,
                School = course.School?.ToNestedSchooLDto(),
                Teacher = course.Teacher?.ToNestedTeacher(),
                Registrations = course.Registrations.Select(reg => reg.ToRegistrationStudentDto()).ToList(),
                Credits = course.Credits
            };
        }

        public static CreateCourseRespDto ToCreateCourseRespDto(this Course course)
        {
            return new CreateCourseRespDto
            {
                Id = course.Id,
                Name = course.Name,
                TeacherId = course.TeacherId,
                SchoolId = course.SchoolId,
                Credits = course.Credits
            };
        }

        public static CourseNoSchoolDtoSchema ToCourseNoSchoolDtoSchema(this Course course)
        {
            return new CourseNoSchoolDtoSchema
            {
                Id = course.Id,
                Name = course.Name,
                Teacher = course.Teacher?.ToNestedTeacher(),
                Registrations = course.Registrations.Select(reg => reg.ToRegistrationStudentDto()).ToList(),
                Credits = course.Credits
            };
        }

        public static NestedCourseDto ToNestedCourseDto(this Course course)
        {
            return new NestedCourseDto
            {
                Id = course.Id,
                Name = course.Name,
                Teacher = course.Teacher?.ToNestedTeacher(),
                Credits = course.Credits
            };
        }

        public static CourseDtoNoPaging ToCourseNotDtoPaging(this Course course)
        {
            return new CourseDtoNoPaging
            {
                Id = course.Id,
                Name = course.Name,
    
            };
        }

        public static CourseNoTeacherSchoolDto ToCourseNoTeacherSchoolDto(this Course course)
        {
            return new CourseNoTeacherSchoolDto
            {
                Id = course.Id,
                Name = course.Name,
                Registrations = course.Registrations.Select(reg => reg.ToRegistrationStudentDto()).ToList(),
                Credits = course.Credits
            };
        }

        public static Course ToCourseFromCreateDto(this CreateCourseDto courseDto)
        {
            return new Course
            {
                Name = courseDto.Name,
                SchoolId = courseDto.SchoolId,
                TeacherId = courseDto.TeacherId,
                Credits = courseDto.Credits
            };
        }
    }
}
