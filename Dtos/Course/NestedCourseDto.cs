using school_management.Dtos.School;

namespace school_management.Dtos.Course
{
    public class NestedCourseDto
    {
         public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public NestedSchoolDto? School { get; set; }

        public int? TeacherId { get; set; }
    }
}
