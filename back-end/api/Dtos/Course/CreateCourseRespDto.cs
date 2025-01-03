namespace school_management.Dtos.Course
{
    public class CreateCourseRespDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Credits { get; set; }

        public int SchoolId { get; set; }

        public int? TeacherId { get; set; }
    }
}
