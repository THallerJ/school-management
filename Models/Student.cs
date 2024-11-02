using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace school_management.Models
{
    public class Student
    {
        // TODO: GENEERATE TABLES AGAIN
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public int? SchoolId { get; set; }

        public School? School { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
