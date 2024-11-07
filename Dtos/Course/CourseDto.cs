namespace school_management.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int? SchoolId { get; set; }

        public int? TeacherId { get; set; }
    }
}
