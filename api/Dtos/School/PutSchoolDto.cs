﻿using System.ComponentModel.DataAnnotations;

namespace school_management.Dtos.School
{
    public class PutSchoolDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [MinLength(10)]
        [MaxLength(10)]
        [RegularExpression("^\\d+$", ErrorMessage = "The phone number must be 10 digits, and include no other characters")]
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
