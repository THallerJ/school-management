using Microsoft.AspNetCore.Mvc;
using school_management.Data;
using school_management.Models;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentController(AppDbContext context) {
            _context = context;
        }
        
        [HttpGet("get_all")]
        public IActionResult GetAll()
        {
            List<Student> students = [.. _context.Students];
            return Ok(students);
        }
    }
}
