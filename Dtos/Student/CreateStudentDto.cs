namespace school_management.Dtos.Student
{
    public class CreateStudentDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public int? SchoolId { get; set; }
    }
}
