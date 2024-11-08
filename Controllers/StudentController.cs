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
            var studentsDto = students.Select(student => student.ToStudentDto());
            return Ok(studentsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = await _studentRepo.GetById(id);

            if (studentModel == null)
            {
                return NotFound();
            }

            return Ok(studentModel.ToStudentDto());
        }

        [HttpPost("create_student")]
        public async Task<IActionResult> Create([FromBody] CreateStudentDto student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = student.ToStudentFromCreateDto();
            await _studentRepo.Create(studentModel);
            return CreatedAtAction(nameof(GetById), new { id = studentModel.Id }, studentModel.ToStudentDto());
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

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] PutStudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var studentModel = await _studentRepo.Put(id, studentDto);

            if (studentModel == null)
            {
                return NotFound();
            }

            return Ok(studentModel.ToStudentDto());
        }
    }
}
