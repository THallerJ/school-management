using school_management.Dtos.Course;
using school_management.Models;

namespace school_management.Mappers
{
    public static class CourseMappers
    {

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
