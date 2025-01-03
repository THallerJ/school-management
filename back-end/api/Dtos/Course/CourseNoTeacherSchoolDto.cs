namespace school_management.Dtos.Course
{
    public class CourseNoTeacherSchoolDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Credits { get; set; }

        public List<RegistrationStudentDto> Registrations { get; set; } = new List<RegistrationStudentDto>();
    }
}
