namespace school_management.Dtos.Course
{
    public class CreateCourseDto
    {
        public string Name { get; set; } = string.Empty;

        public int SchoolId { get; set; }

        public int TeacherId { get; set; }
    }
}
