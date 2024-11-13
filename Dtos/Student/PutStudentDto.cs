using System.ComponentModel.DataAnnotations;

namespace school_management.Dtos.Student
{
    public class PutStudentDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int SchoolId { get; set; }
    }
}
