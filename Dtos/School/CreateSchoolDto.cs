namespace school_management.Dtos.School
{
    public class CreateSchoolDto
    {
        public required string Name { get; set; }

        public required string Address { get; set; }

        public required string PhoneNumber { get; set; }
    }
}
