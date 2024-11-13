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
                Teacher = course.Teacher?.ToTeacherDto(),
            };
        }

        public static NestedCourseDto ToNestedCourseDto(this Course course)
        {
            return new NestedCourseDto
            {
                Id = course.Id,
                Name = course.Name,
                School = course.School?.ToNestedSchooLDto(),
                TeacherId = course.TeacherId,
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
