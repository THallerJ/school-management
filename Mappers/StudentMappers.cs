using school_management.Dtos.Student;
using school_management.Models;

namespace school_management.Mappers
{
    public static class StudentMappers
    {

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
