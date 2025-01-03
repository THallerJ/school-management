using school_management.Dtos.Common;

namespace school_management.Dtos.School
{
    public class SchoolFilter : Filter
    {
        public string? Name { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
