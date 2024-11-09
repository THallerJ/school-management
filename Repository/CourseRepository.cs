using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Dtos.Course;
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

            if (courseModel == null) return null;
            
            _context.Courses.Remove(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<List<Course>> Get(CourseFilter filter)
        {
            var courses = _context.Courses.AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(filter.Name))
                courses = courses.Where(s => s.Name.Contains(filter.Name));

            if (filter.TeacherId != null)
                courses = courses.Where(s => s.TeacherId.Equals(filter.TeacherId));

            if (filter.SchoolId != null)
                courses = courses.Where(s => s.SchoolId.Equals(filter.SchoolId));

            return await courses.ToListAsync();
        }

        public async Task<Course?> Put(int id, PutCourseDto courseDto)
        {
            var courseToUpdate = await _context.Courses.FirstOrDefaultAsync(coures => coures.Id == id);

            if (courseToUpdate == null) return null;
            
            courseToUpdate.TeacherId = courseDto.TeacherId;
            courseToUpdate.SchoolId = courseDto.SchoolId;
            courseToUpdate.Name = courseDto.Name;
            
            await _context.SaveChangesAsync();

            return courseToUpdate;
        }

        public async Task<Course?> GetById(int id) {
            return await _context.Courses.FirstOrDefaultAsync(course => course.Id == id);
        }
    }
}
