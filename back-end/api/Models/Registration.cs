using System.ComponentModel.DataAnnotations.Schema;

namespace school_management.Models
{
    [Table("Registrations")]
    public class Registration
    {
        public int CourseId { get; set; }

        public Course? Course { get; set; }

        public int StudentId { get; set; }

        public Student? Student { get; set; }
    }
}
