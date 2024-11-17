using school_management.Dtos.Student;
using school_management.Models;

namespace school_management.Interface
{
    public interface IStudentRepository
    {
        Task<List<Student>> Get(StudentFilter filter);
        Task<Student> Create(Student studentModel);
        Task<Student?> Delete(int id);
        Task<Student?> Put(int id, PutStudentDto studentDto);
        Task<Student?> GetById(int id);
    }
}
