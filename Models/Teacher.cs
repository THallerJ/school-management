namespace school_management.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int SchoolId { get; set; }

        public School? School { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
