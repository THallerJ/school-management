namespace school_management.Models
{
    public class School
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
