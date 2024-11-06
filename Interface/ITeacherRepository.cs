using school_management.Models;

namespace school_management.Interface
{
    public interface ITeacherRepository
    {
        Task<List<Teacher>> Get();
        Task<Course> Create(Teacher teacherModel);
        Task<Course?> Delete(int id);
    }
}
