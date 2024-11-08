namespace school_management.Dtos.Student
{
    public class PutStudentDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int? SchoolId { get; set; }
    }
}
