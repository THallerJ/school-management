using school_management.Dtos.School;
using school_management.Models;

namespace school_management.Mappers
{
    public static class SchoolMappers
    {
        public static SchoolDto ToSchoolDto(this School school)
        {
            return new SchoolDto
            {
                Id = school.Id,
                Name = school.Name,
                Address = school.Address,
                PhoneNumber = school.PhoneNumber,
                Courses = school.Courses.Select(course => course.ToCourseNoSchoolDto()).ToList()
            };
        }

        public static NestedSchoolDto ToNestedSchooLDto(this School school)
        {
            return new NestedSchoolDto
            {
                Id = school.Id,
                Name = school.Name,
                Address = school.Address,
                PhoneNumber = school.PhoneNumber,
            };
        }

        public static CreateSchoolRespDto ToCreateSchoolRespDto(this School school)
        {
            return new CreateSchoolRespDto
            {
                Id = school.Id,
                Name = school.Name,
                Address = school.Address,
                PhoneNumber = school.PhoneNumber,
            };
        }

        public static School ToSchoolFromCreateDto(this CreateSchoolDto schoolDto)
        {
            return new School
            {
                Name = schoolDto.Name,
                Address = schoolDto.Address,
                PhoneNumber = schoolDto.PhoneNumber
            };
        }
    }
}
