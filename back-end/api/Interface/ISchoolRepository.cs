using school_management.Dtos.School;
using school_management.Models;

namespace school_management.Interface
{
    public interface ISchoolRepository
    {
        Task<List<School>> GetSchools(SchoolFilter filter);
        Task<School> CreateSchool(School schoolModel);
        Task<School?> DeleteSchool(int id);
        Task<School?> UpdateSchool(int id, PutSchoolDto schoolDto);
        Task<School?> GetSchoolById(int id);
    }
}
