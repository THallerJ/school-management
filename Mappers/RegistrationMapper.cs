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
                Student = registration.Student?.ToNestedStudentDto(),
            };
        }
    }
}
