namespace school_management.Dtos.Teacher
{
    public class CreateTeacherDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public int? SchoolId { get; set; }
    }
}
