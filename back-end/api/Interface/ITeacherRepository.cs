using school_management.Dtos.Teacher;
using school_management.Models;

namespace school_management.Interface
{
    public interface ITeacherRepository
    {
        Task<List<Teacher>> GetTeachers(TeacherFilter filter);
        Task<Teacher> CreateTeacher(Teacher teacherModel);
        Task<Teacher?> DeleteTeacher(int id);
        Task<Teacher?> UpdateTeacher(int id, PutTeacherDto teacherDto);
        Task<Teacher?> GetTeacherById(int id);
    }
}
