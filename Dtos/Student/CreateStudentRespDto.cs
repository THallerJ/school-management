namespace school_management.Dtos.Student
{
    public class CreateStudentRespDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public int? SchoolId { get; set; }
    }
}
