using school_management.Dtos.Teacher;
using school_management.Models;

namespace school_management.Interface
{
    public interface ITeacherRepository
    {
        Task<List<Teacher>> Get(TeacherFilter filter);
        Task<Teacher> Create(Teacher teacherModel);
        Task<Teacher?> Delete(int id);
        Task<Teacher?> Put(int id, PutTeacherDto teacherDto);
        Task<Teacher?> GetById(int id);

    }
}
