using school_management.Models;

namespace school_management.Interface
{
    public interface ITeacherRepository
    {
        Task<List<Teacher>> Get();
        Task<Teacher> Create(Teacher teacherModel);
        Task<Teacher?> Delete(int id);
        Task<Teacher?> Update(int id);
        Task<Teacher?> GetById(int id);

    }
}
