using school_management.Models;

namespace school_management.Interface
{
    public interface ICourseRepository
    {
        Task<List<Course>> Get();
        Task<Course> Create(Course courseModel);
        Task<Course?> Delete(int id);
    }
}
