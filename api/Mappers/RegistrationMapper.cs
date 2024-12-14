using school_management.Dtos.Course;
using school_management.Models;

namespace school_management.Mappers
{
    public static class RegistrationMapper
    {
        public static RegistrationCourseDto ToRegistrationCourseDto(this Registration registration)
        {
            return new RegistrationCourseDto
            {
                Course = registration.Course?.ToNestedCourseDto(),
            };
        }

        public static RegistrationStudentDto ToRegistrationStudentDto(this Registration registration)
        {
            return new RegistrationStudentDto
            {
                student = registration.Student?.ToNestedStudentDto(),
            };
        }

        public static Registration ToRegistrationFromDto(this RegistrationDto registrationDto)
        {
            return new Registration
            {
                StudentId = registrationDto.StudentId,
                CourseId = registrationDto.CourseId
            };
        }

    }
}
