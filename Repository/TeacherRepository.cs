using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class TeacherRepository : ITeacherRepository
    {
        public Task<Course> Create(Teacher teacherModel)
        {
            throw new NotImplementedException();
        }

        public Task<Course?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Teacher>> Get()
        {
            throw new NotImplementedException();
        }
    }
}
