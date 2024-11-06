using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class TeacherRepository(AppDbContext context) : ITeacherRepository
    {
        AppDbContext _context = context;

        public async Task<Teacher> Create(Teacher teacherModel)
        {
            await _context.Teachers.AddAsync(teacherModel);
            await _context.SaveChangesAsync();
            return teacherModel;
        }

        public async Task<Teacher?> Delete(int id)
        {
            var teacherModel = await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.Id == id);

            if (teacherModel == null)
            {
                return null;
            }

            _context.Teachers.Remove(teacherModel);
            await _context.SaveChangesAsync();
            return teacherModel;
        }

        public async Task<List<Teacher>> Get()
        {
            List<Teacher> teacher = await _context.Teachers.ToListAsync();
            return teacher;
        }

        public async Task<Teacher?> Update(int id)
        {
            throw new NotImplementedException();
        }
    }
}
