namespace school_management.Models
{
    public class Student
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int? SchoolId { get; set; }

        public string Email { get; set; } = String.Empty;

        public School? School { get; set; }

        public List<Registration> Registrations { get; set; } = new List<Registration>();
    }
}
