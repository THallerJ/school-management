using school_management.Dtos.Student;
using school_management.Models;

namespace school_management.Interface
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetStudents(StudentFilter filter);
        Task<Student> CreateStudent(Student studentModel);
        Task<Student?> DeleteStudent(int id);
        Task<Student?> UpdateStudent(int id, PutStudentDto studentDto);
        Task<Student?> GetStudentById(int id);
    }
}
