using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Teacher;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/teachers")]
    public class TeacherController(ITeacherRepository teacherRepo) : ControllerBase
    {
        private readonly ITeacherRepository _teacherRepo = teacherRepo;

        [HttpGet]
        public async Task<IActionResult> GetTeachers([FromQuery] TeacherFilter filter)
        {
            var teachers = await _teacherRepo.GetTeachers(filter);
            var teachersDto = teachers.Select(teacher => teacher.ToTeacherDto());
            return Ok(teachersDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTeacherById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.GetTeacherById(id);

            if (teacherModel == null) return NotFound();

            return Ok(teacherModel.ToTeacherDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeacher([FromBody] CreateTeacherDto teacher)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var teacherModel = teacher.ToTeacherFromCreateDto();
            await _teacherRepo.CreateTeacher(teacherModel);
            return CreatedAtAction(nameof(GetTeacherById), new { id = teacherModel.Id }, teacherModel.ToCreateTeacherRespDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTeacher([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.DeleteTeacher(id);

            if (teacherModel == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateTeacher([FromRoute] int id, [FromBody] PutTeacherDto teacherDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var teacherModel = await _teacherRepo.UpdateTeacher(id, teacherDto);

            if (teacherModel == null) return NotFound();

            return Ok(teacherModel.ToTeacherDto());
        }
    }
}
