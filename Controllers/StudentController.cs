using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Student;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController(IStudentRepository studentRepo) : ControllerBase
    {
        private readonly IStudentRepository _studentRepo = studentRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _studentRepo.Get();
            return Ok(students);
        }


        [HttpPost("create_student")]
        public async Task<IActionResult> Create([FromBody] CreateStudentDto student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = student.ToStudentFromCreateDto();
            await _studentRepo.Create(studentModel);
            return Ok(studentModel);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStudent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = await _studentRepo.Delete(id);

            if (studentModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
