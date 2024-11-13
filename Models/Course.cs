namespace school_management.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        
        public int SchoolId { get; set; }

        public School? School { get; set; }

        public int? TeacherId { get; set; }

        public Teacher? Teacher { get; set; }

        public List<Student> Students { get; set; } = new List<Student>();
    }
}
