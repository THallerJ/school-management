using Microsoft.AspNetCore.Mvc;
using school_management.Data;
using school_management.Dtos.Student;
using school_management.Mappers;
using school_management.Models;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Student> students = [.. _context.Students];
            return Ok(students);
        }


        [HttpPost("create_student")]
        public IActionResult Create([FromBody] CreateStudentDto student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = student.ToStudentFromCreateDto();
            _context.Students.Add(studentModel);
            _context.SaveChanges();
            return Ok(studentModel);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteStudent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = _context.Students.FirstOrDefault(student => student.Id == id);

            if (studentModel == null)
            {
                return NotFound();
            }

            _context.Students.Remove(studentModel);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
