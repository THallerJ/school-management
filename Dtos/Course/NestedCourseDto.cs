using school_management.Dtos.School;
using school_management.Dtos.Teacher;

namespace school_management.Dtos.Course
{
    public class NestedCourseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public NestedTeacherDto? Teacher { get; set; }
    }
}
