using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Course;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/courses")]
    public class CourseController(ICourseRepository courseRepo) : ControllerBase
    {
        private readonly ICourseRepository _courseRepo = courseRepo;

        [HttpGet]
        public async Task<IActionResult> GetCourses([FromQuery] CourseFilter filter)
        {
            var courses = await _courseRepo.GetCourses(filter);
            var coursesDto = courses.Select(course => course.ToCourseDto());
            return Ok(coursesDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCourseById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = await _courseRepo.GetCourseById(id);

            if (courseModel == null) return NotFound();

            return Ok(courseModel.ToCourseDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto courseDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = courseDto.ToCourseFromCreateDto();
            await _courseRepo.CreateCourse(courseModel);
            return CreatedAtAction(nameof(GetCourseById), new { id = courseModel.Id }, courseModel.ToCreateCourseRespDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCourse([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = await _courseRepo.DeleteCourse(id);

            if (courseModel == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateCourse([FromRoute] int id, [FromBody] PutCourseDto courseDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = await _courseRepo.UpdateCourse(id, courseDto);

            if (courseModel == null) return NotFound();

            return Ok(courseModel.ToCourseDto());
        }
    }
}