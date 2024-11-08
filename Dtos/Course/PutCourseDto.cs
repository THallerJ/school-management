namespace school_management.Dtos.Course
{
    public class PutCourseDto
    {
        public string Name { get; set; } = string.Empty;

        public int? SchoolId { get; set; }

        public int? TeacherId { get; set; }
    }
}
