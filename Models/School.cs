using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace school_management.Models
{
    public class School
    {
        // TODO: GENEERATE TABLES AGAIN
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Address { get; set; }

        public required string PhoneNumber { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();

    }
}
