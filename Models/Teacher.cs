namespace school_management.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public int? SchoolId { get; set; }

        public School? School { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
