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
            var schools = await _teacherRepo.Get();
            return Ok(schools);

        }

        [HttpPost("create_teacher")]
        public async Task<IActionResult> Create([FromBody] CreateTeacherDto teacher)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var teacherModel = teacher.ToTeacherFromCreateDto();
            await _teacherRepo.Create(teacherModel);
            return Ok(teacherModel);
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
    }
}
