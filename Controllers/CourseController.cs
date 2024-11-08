using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Course;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/course")]
    public class CourseController(ICourseRepository courseRepo) : ControllerBase
    {
        private readonly ICourseRepository _courseRepo = courseRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses =  await _courseRepo.Get();
            var coursesDto = courses.Select(course => course.ToCourseDto());
            return Ok(coursesDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = await _courseRepo.GetById(id);

            if (courseModel == null)
            {
                return NotFound();
            }

            return Ok(courseModel.ToCourseDto());
        }

        [HttpPost("create_course")]
        public async Task<IActionResult> Post([FromBody] CreateCourseDto courseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = courseDto.ToCourseFromCreateDto();
            await _courseRepo.Create(courseModel);
            return CreatedAtAction(nameof(GetById), new {id = courseModel.Id}, courseModel.ToCourseDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = await _courseRepo.Delete(id);

            if (courseModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] PutCourseDto courseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = await _courseRepo.Put(id, courseDto);

            if (courseModel == null)
            {
                return NotFound();
            }

            return Ok(courseModel.ToCourseDto());
        }
    }
}