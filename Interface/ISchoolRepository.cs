using school_management.Dtos.School;
using school_management.Models;

namespace school_management.Interface
{
    public interface ISchoolRepository
    {
        Task<List<School>> Get();
        Task<School> Create(School schoolModel);
        Task<School?> Delete(int id);
        Task<School?> Put(int id, PutSchoolDto schoolDto);
        Task<School?> GetById(int id);


    }
}
