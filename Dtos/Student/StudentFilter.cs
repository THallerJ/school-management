using school_management.Dtos.Common;

namespace school_management.Dtos.Student
{
    public class StudentFilter : Filter
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int? SchoolId { get; set; }
    }
}
