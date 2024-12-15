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
                Registrations = student.Registrations.Select(reg => reg.ToRegistrationCourseDto()).ToList(),
                Email = student.Email

            };
        }

        public static NestedStudentDto ToNestedStudentDto(this Student student)
        {
            return new NestedStudentDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email
            };
        }

        public static StudentDtoNoPaging ToStudentDtoNoPaging(this Student student)
        {
            return new StudentDtoNoPaging
            {
                Id = student.Id,
                Name = student.FirstName + " " + student.LastName
            };
        }


        public static CreateStudentRespDto ToCreateStudentRespDto(this Student student)
        {
            return new CreateStudentRespDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                SchoolId = student.SchoolId,
                Email = student.Email
            };
        }

        public static Student ToStudentFromCreateDto(this CreateStudentDto studentDto)
        {
            return new Student
            {
                FirstName = studentDto.FirstName,
                LastName = studentDto.LastName,
                SchoolId = studentDto.SchoolId,
                Email = studentDto.Email
            };
        }
    }
}
