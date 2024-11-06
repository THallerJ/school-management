using Microsoft.EntityFrameworkCore;
using school_management.Data;
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

            if (studentModel == null)
            {
                return null;
            }

            _context.Students.Remove(studentModel);
            await _context.SaveChangesAsync();
            return studentModel;
        }

        public async Task<List<Student>> Get()
        {
            List<Student> students = await _context.Students.ToListAsync();
            return students;
        }

        public Task<Student?> Update(int id)
        {
            throw new NotImplementedException();
        }
    }
}


