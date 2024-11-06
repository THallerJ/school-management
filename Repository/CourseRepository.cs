using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class CourseRepository(AppDbContext context) : ICourseRepository
    {
        private readonly AppDbContext _context = context;
        public async Task<Course> Create(Course courseModel)
        {
            await _context.Courses.AddAsync(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<Course?> Delete(int id)
        {
            var courseModel = await _context.Courses.FirstOrDefaultAsync(course => course.Id == id);

            if (courseModel == null)
            {
                return null;
            }

            _context.Courses.Remove(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<List<Course>> Get()
        {
            List<Course> courses = await _context.Courses.ToListAsync();
            return courses;
        }

        public Task<Course?> Update(int id)
        {
            throw new NotImplementedException();
        }
    }
}
