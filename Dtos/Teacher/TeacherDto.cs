using school_management.Dtos.Course;
using school_management.Dtos.School;

namespace school_management.Dtos.Teacher
{
    public class TeacherDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public NestedSchoolDto? School { get; set; }

        public List<CourseDto> Courses { get; set; } = new List<CourseDto>();

    }
}
