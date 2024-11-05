using school_management.Dtos.School;
using school_management.Models;

namespace school_management.Mappers
{
    public static class SchoolMappers
    {

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
