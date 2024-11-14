using school_management.Dtos.Student;
using school_management.Models;

namespace school_management.Mappers
{
    public static class StudentMappers
    {
        public static StudentDto ToStudentDto(this Student student)
        {
            return new StudentDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                School = student.School?.ToNestedSchooLDto(),
                Registrations = student.Registrations.Select(reg => reg.ToRegistrationDto()).ToList()

            };
        }

        public static Student ToStudentFromCreateDto(this CreateStudentDto stockDto)
        {
            return new Student
            {
                FirstName = stockDto.FirstName,
                LastName = stockDto.LastName,
                SchoolId = stockDto.SchoolId
            };
        }
    }
}
