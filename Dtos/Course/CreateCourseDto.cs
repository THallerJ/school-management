namespace school_management.Dtos.Course
{
    public class CreateCourseDto
    {
        public required string Name { get; set; }

        public int SchoolId { get; set; }

        public int TeacherId { get; set; }
    }
}
