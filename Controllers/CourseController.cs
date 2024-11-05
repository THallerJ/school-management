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

        [HttpGet("get_all")]
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
    }
}