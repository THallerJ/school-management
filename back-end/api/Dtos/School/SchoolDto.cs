using school_management.Dtos.Course;

namespace school_management.Dtos.School
{
    public class SchoolDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public List<CourseNoSchoolDtoSchema> Courses { get; set; } = new List<CourseNoSchoolDtoSchema>();
    }
}
