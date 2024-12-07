using school_management.Dtos.Teacher;
using school_management.Models;

namespace school_management.Mappers
{
    public static class TeacherMappers
    {
        public static TeacherDto ToTeacherDto(this Teacher teacher)
        {
            return new TeacherDto
            {
                Id = teacher.Id,
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
                Courses = teacher.Courses.Select(course => course.ToCourseNoTeacherSchoolDto()).ToList(),
                School = teacher.School?.ToNestedSchooLDto(),
            };
        }

        public static NestedTeacherDto ToNestedTeacher(this Teacher teacher)
        {
            return new NestedTeacherDto
            {
                Id = teacher.Id,
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
            };
        }

        public static TeacherDtoNoPaging ToTeacherDtoNoPaging(this Teacher teacher)
        {
            return new TeacherDtoNoPaging
            {
                Id = teacher.Id,
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
            };
        }

        public static CreateTeacherRespDto ToCreateTeacherRespDto(this Teacher teacher)
        {
            return new CreateTeacherRespDto
            {
                Id = teacher.Id,
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
                SchoolId = teacher.SchoolId
            };
        }

        public static Teacher ToTeacherFromCreateDto(this CreateTeacherDto stockDto)
        {
            return new Teacher
            {
                FirstName = stockDto.FirstName,
                LastName = stockDto.LastName,
                SchoolId = stockDto.SchoolId,
            };
        }
    }
}
