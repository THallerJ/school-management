using school_management.Dtos.Teacher;

namespace school_management.Dtos.Course
{
    public class NestedCourseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Credits { get; set; }

        public NestedTeacherDto? Teacher { get; set; }
    }
}
