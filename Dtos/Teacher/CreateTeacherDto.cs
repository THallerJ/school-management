namespace school_management.Dtos.Teacher
{
    public class CreateTeacherDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int? SchoolId { get; set; }
    }
}
