using school_management.Dtos.School;
using school_management.Dtos.Teacher;

namespace school_management.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public NestedSchoolDto? School { get; set; }

        public NestedTeacherDto? Teacher { get; set; }

        public List<RegistrationStudentDto> Registrations { get; set; } = new List<RegistrationStudentDto>();
    }
}
