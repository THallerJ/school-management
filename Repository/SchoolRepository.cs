using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class SchoolRepository : ISchoolRepository
    {
        public Task<School> Create(School schoolModel)
        {
            throw new NotImplementedException();
        }

        public Task<School?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<School>> Get()
        {
            throw new NotImplementedException();
        }
    }
}
