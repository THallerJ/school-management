using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class CourseRepository : ICourseRepository
    {
        public Task<Course> Create(Course courseModel)
        {
            throw new NotImplementedException();
        }

        public Task<Course?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Course>> Get()
        {
            throw new NotImplementedException();
        }
    }
}
