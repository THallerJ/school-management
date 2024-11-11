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

        public async Task<Student> Create(Student studentModel)
        {
            await _context.Students.AddAsync(studentModel);
            await _context.SaveChangesAsync();
            return studentModel;
        }

        public async Task<Student?> Delete(int id)
        {
            var studentModel = await _context.Students.FirstOrDefaultAsync(student => student.Id == id);

            if (studentModel == null) return null;
            
            _context.Students.Remove(studentModel);
            await _context.SaveChangesAsync();
            return studentModel;
        }

        public async Task<List<Student>> Get(StudentFilter filter)
        {
            var students = _context.Students.AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(filter.FirstName))
                students = students.Where(student => student.FirstName.Contains(filter.FirstName));

            if (!string.IsNullOrWhiteSpace(filter.LastName))
                students = students.Where(student => student.LastName.Equals(filter.LastName));

            if (filter.SchoolId != null)
                students = students.Where(student => student.SchoolId.Equals(filter.SchoolId));

            return await students.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
        }

        public async Task<Student?> Put(int id, PutStudentDto studentDto)
        {
            var studentToUpdate = await _context.Students.FirstOrDefaultAsync(student => student.Id == id);

            if (studentToUpdate == null) return null;
            
            studentToUpdate.FirstName = studentDto.FirstName;
            studentToUpdate.LastName = studentDto.LastName;
            studentToUpdate.SchoolId = studentDto.SchoolId;
            
            await _context.SaveChangesAsync();

            return studentToUpdate;
        }

        public async Task<Student?> GetById(int id)
        {
            return await _context.Students.FirstOrDefaultAsync(student => student.Id == id);
        }
    }
}


