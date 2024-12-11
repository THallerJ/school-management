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
        public async Task<Course> CreateCourse(Course courseModel)
        {
            await _context.Courses.AddAsync(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<Course?> DeleteCourse(int id)
        {
            var courseModel = await _context.Courses.FirstOrDefaultAsync(course => course.Id == id);

            if (courseModel == null) return null;

            _context.Courses.Remove(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<List<Course>> GetCourses(CourseFilter filter)
        {

            var courses = _context.Courses.Include(course => course.School)
                .Include(course => course.Teacher).Include(course => course.Registrations)
                .ThenInclude(reg => reg.Student).AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Name))
                courses = courses.Where(course => course.Name.Contains(filter.Name));

            if (filter.TeacherId != null)
                courses = courses.Where(course => course.TeacherId.Equals(filter.TeacherId));

            if (filter.SchoolId != null)
                courses = courses.Where(course => course.SchoolId.Equals(filter.SchoolId));

            if (filter.Credits != null)
                courses = courses.Where(course => course.Credits.Equals(filter.Credits));

            courses = courses.OrderBy(id => id);

            if (!filter.DisablePaging) {
                courses = courses.Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            }

            return await courses.ToListAsync();
        }

        public async Task<Course?> UpdateCourse(int id, PutCourseDto courseDto)
        {
            var courseToUpdate = await _context.Courses
                .FirstOrDefaultAsync(coures => coures.Id == id);

            if (courseToUpdate == null) return null;

            courseToUpdate.TeacherId = courseDto.TeacherId;
            courseToUpdate.SchoolId = courseDto.SchoolId;
            courseToUpdate.Name = courseDto.Name;

            await _context.SaveChangesAsync();

            return courseToUpdate;
        }

        public async Task<Course?> GetCourseById(int id)
        {
            return await _context.Courses.Include(course => course.School)
                .Include(course => course.Teacher).Include(course => course.Registrations)
                .ThenInclude(reg => reg.Student).FirstOrDefaultAsync(course => course.Id == id);
        }
    }
}
