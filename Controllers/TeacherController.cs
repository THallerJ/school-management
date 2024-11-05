using Microsoft.AspNetCore.Mvc;
using school_management.Data;
using school_management.Dtos.Teacher;
using school_management.Mappers;
using school_management.Models;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/teacher")]
    public class TeacherController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Teacher> teachers = [.. _context.Teachers];
            return Ok(teachers);

        }

        [HttpPost("create_teacher")]
        public IActionResult Create([FromBody] CreateTeacherDto teacher)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = teacher.ToTeacherFromCreateDto();
            _context.Teachers.Add(teacherModel);
            _context.SaveChanges();
            return Ok(teacherModel);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteTeacher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = _context.Teachers.FirstOrDefault(teacher => teacher.Id == id);

            if (teacherModel == null)
            {
                return NotFound();
            }

            _context.Teachers.Remove(teacherModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
