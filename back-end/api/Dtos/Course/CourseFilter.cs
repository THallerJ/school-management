using school_management.Dtos.Common;

namespace school_management.Dtos.Course
{
    public class CourseFilter : Filter
    {
        public string? Name { get; set; }

        public int? Credits { get; set; }

        public int? SchoolId { get; set; }

        public int? TeacherId { get; set; }
    }
}