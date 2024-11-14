namespace school_management.Models
{
    public class Registration
    {
        public int CourseId { get; set; }

        public Course? Course { get; set; }

        public int StudentId { get; set; }

        public Student? Student { get; set; }
    }
}
