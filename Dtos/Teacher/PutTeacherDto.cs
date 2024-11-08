namespace school_management.Dtos.Teacher
{
    public class PutTeacherDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int? SchoolId { get; set; }
    }
}
