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
                Registrations = course.Registrations.Select(reg => reg.ToRegistrationStudentDto()).ToList()
            };
        }

        public static CourseNoSchoolDto ToCourseNoSchoolDto(this Course course)
        {
            return new CourseNoSchoolDto
            {
                Id = course.Id,
                Name = course.Name,
                Teacher = course.Teacher?.ToNestedTeacher(),
            };
        }

        public static NestedCourseDto ToNestedCourseDto(this Course course)
        {
            return new NestedCourseDto
            {
                Id = course.Id,
                Name = course.Name,
                Teacher = course.Teacher?.ToNestedTeacher(),
            };
        }

        public static CourseNoTeacherSchoolDto ToCourseNoTeacherSchoolDto(this Course course)
        {
            return new CourseNoTeacherSchoolDto
            {
                Id = course.Id,
                Name = course.Name,
                Registrations = course.Registrations.Select(reg => reg.ToRegistrationStudentDto()).ToList()
            };
        }
        
        public static Course ToCourseFromCreateDto(this CreateCourseDto courseDto)
        {
            return new Course
            {
                Name = courseDto.Name,
                SchoolId = courseDto.SchoolId,
                TeacherId = courseDto.TeacherId
            };
        }
    }
}
