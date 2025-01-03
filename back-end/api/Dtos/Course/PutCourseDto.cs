using System.ComponentModel.DataAnnotations;

namespace school_management.Dtos.Course
{
    public class PutCourseDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Credits { get; set; }

        [Range(1, int.MaxValue)]
        public int SchoolId { get; set; }

        [Range(1, int.MaxValue)]
        public int? TeacherId { get; set; }
    }
}
