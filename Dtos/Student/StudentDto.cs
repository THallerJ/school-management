using school_management.Dtos.Course;
using school_management.Dtos.School;

namespace school_management.Dtos.Student
{
    public class StudentDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public NestedSchoolDto? School { get; set; }

        public List<RegistrationCourseDto> Registrations { get; set; } = new List<RegistrationCourseDto>();
    }
}
