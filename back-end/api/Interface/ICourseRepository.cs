using school_management.Dtos.Course;
using school_management.Models;

namespace school_management.Interface
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetCourses(CourseFilter filter);
        Task<Course> CreateCourse(Course courseModel);
        Task<Course?> DeleteCourse(int id);
        Task<Course?> UpdateCourse(int id, PutCourseDto courseDto);
        Task<Course?> GetCourseById(int id);
    }
}
