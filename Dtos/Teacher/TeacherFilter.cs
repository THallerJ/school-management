using school_management.Dtos.Common;

namespace school_management.Dtos.Teacher
{
    public class TeacherFilter : Filter
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int? SchoolId { get; set; }
    }
}
