using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Dtos.Student;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class StudentRepository(AppDbContext context) : IStudentRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Student> CreateStudent(Student studentModel)
        {
            await _context.Students.AddAsync(studentModel);
            await _context.SaveChangesAsync();
            return studentModel;
        }

        public async Task<Student?> DeleteStudent(int id)
        {
            var studentModel = await _context.Students
                .FirstOrDefaultAsync(student => student.Id == id);

            if (studentModel == null) return null;

            _context.Students.Remove(studentModel);
            await _context.SaveChangesAsync();
            return studentModel;
        }

        public async Task<List<Student>> GetStudents(StudentFilter filter)
        {
            var students = _context.Students.Include(student => student.School)
                .Include(student => student.Registrations).ThenInclude(reg => reg.Course)
                .ThenInclude(course => course!.Teacher).AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.FirstName))
                students = students.Where(student => student.FirstName.Contains(filter.FirstName));

            if (!string.IsNullOrWhiteSpace(filter.LastName))
                students = students.Where(student => student.LastName.Equals(filter.LastName));

            if (!string.IsNullOrWhiteSpace(filter.Email))
                students = students.Where(student => student.Email.Equals(filter.Email));

            if (filter.SchoolId != null)
                students = students.Where(student => student.SchoolId.Equals(filter.SchoolId));
                
            students = students.OrderBy(id => id);

            if (!filter.DisablePaging) {
                students = students.Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            }

            return await students.ToListAsync();
        }

        public async Task<Student?> UpdateStudent(int id, PutStudentDto studentDto)
        {
            var studentToUpdate = await _context.Students.FirstOrDefaultAsync(student => student.Id == id);

            if (studentToUpdate == null) return null;

            studentToUpdate.FirstName = studentDto.FirstName;
            studentToUpdate.LastName = studentDto.LastName;
            studentToUpdate.SchoolId = studentDto.SchoolId;
            studentToUpdate.Email = studentDto.Email;

            await _context.SaveChangesAsync();

            return studentToUpdate;
        }

        public async Task<Student?> GetStudentById(int id)
        {
            return await _context.Students.Include(student => student.School)
                .Include(student => student.Registrations).ThenInclude(reg => reg.Course)
                .ThenInclude(course => course!.Teacher).FirstOrDefaultAsync(student => student.Id == id);
        }
    }
}


