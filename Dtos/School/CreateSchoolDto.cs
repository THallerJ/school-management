using System.ComponentModel.DataAnnotations;

namespace school_management.Dtos.School
{
    public class CreateSchoolDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [MinLength(7)]
        [MaxLength(7)]
        [RegularExpression("^\\d+$", ErrorMessage ="The phone number must be 7 digits, and include no other characters")]
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
