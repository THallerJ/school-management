using school_management.Dtos.Course;
using school_management.Models;

namespace school_management.Mappers
{
    public static class RegistrationMapper
    {
        public static RegistrationDto ToRegistrationDto(this Registration registration)
        {
            return new RegistrationDto
            {
                CourseId = registration.CourseId,
                StudentId = registration.StudentId,
            };
        }
    }
}
