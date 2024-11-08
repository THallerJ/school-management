using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Teacher;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/teacher")]
    public class TeacherController(ITeacherRepository teacherRepo) : ControllerBase
    {
        private readonly ITeacherRepository _teacherRepo = teacherRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var teachers = await _teacherRepo.Get();
            var teachersDto = teachers.Select(teacher => teacher.ToTeacherDto());
            return Ok(teachersDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.GetById(id);

            if (teacherModel == null)
            {
                return NotFound();
            }

            return Ok(teacherModel.ToTeacherDto());
        }

        [HttpPost("create_teacher")]
        public async Task<IActionResult> Create([FromBody] CreateTeacherDto teacher)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = teacher.ToTeacherFromCreateDto();
            await _teacherRepo.Create(teacherModel);
            return CreatedAtAction(nameof(GetById), new { id = teacherModel.Id }, teacherModel.ToTeacherDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTeacher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.Delete(id);

            if (teacherModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] PutTeacherDto teacherDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.Put(id, teacherDto);

            if (teacherModel == null)
            {                                                                                                                                                                                                                                                                     
                return NotFound();
            }

            return Ok(teacherModel.ToTeacherDto());
        }
    }
}
