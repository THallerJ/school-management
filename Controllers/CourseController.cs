using Microsoft.AspNetCore.Mvc;
using school_management.Data;
using school_management.Dtos.Course;
using school_management.Mappers;
using school_management.Models;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/course")]
    public class CourseController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Course> courses = [.. _context.Courses];
            return Ok(courses);

        }

        [HttpPost("create_course")]
        public IActionResult Create([FromBody] CreateCourseDto courseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = courseDto.ToCourseFromCreateDto();
            _context.Courses.Add(courseModel);
            _context.SaveChanges();
            return Ok(courseModel);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteCourse([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = _context.Courses.FirstOrDefault(course => course.Id == id);

            if (courseModel == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(courseModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}