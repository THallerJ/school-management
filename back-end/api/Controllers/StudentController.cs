using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Student;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/students")]
    public class StudentController(IStudentRepository studentRepo) : ControllerBase
    {
        private readonly IStudentRepository _studentRepo = studentRepo;

        [HttpGet]
        public async Task<IActionResult> GetStudents([FromQuery] StudentFilter filter)
        {
            var students = await _studentRepo.GetStudents(filter);
            if (filter.DisablePaging) {
                var studentsDtoNoPaging = students.Select(student => student.ToStudentDtoNoPaging());
                return Ok(studentsDtoNoPaging);
            } else {
                var studentsDto = students.Select(student => student.ToStudentDto());
                return Ok(studentsDto);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStudentById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var studentModel = await _studentRepo.GetStudentById(id);

            if (studentModel == null) return NotFound();

            return Ok(studentModel.ToStudentDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDto student)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var studentModel = student.ToStudentFromCreateDto();
            await _studentRepo.CreateStudent(studentModel);
            return CreatedAtAction(nameof(GetStudentById), new { id = studentModel.Id }, studentModel.ToCreateStudentRespDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStudent([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var studentModel = await _studentRepo.DeleteStudent(id);

            if (studentModel == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateStudent([FromRoute] int id, [FromBody] PutStudentDto studentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var studentModel = await _studentRepo.UpdateStudent(id, studentDto);

            if (studentModel == null) return NotFound();

            return Ok(studentModel.ToStudentDto());
        }
    }
}
