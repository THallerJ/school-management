using school_management.Models;

namespace school_management.Interface
{
    public interface ISchoolRepository
    {
        Task<List<School>> Get();
        Task<School> Create(School schoolModel);
        Task<School?> Delete(int id);
        Task<School?> Update(int id);

    }
}
