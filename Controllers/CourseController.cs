﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("create_course")]
        public async Task<IActionResult> Create([FromBody] CreateCourseDto courseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var courseModel = courseDto.ToCourseFromCreateDto();
            await _courseRepo.Create(courseModel);
            return Ok(courseModel.ToCourseDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCourse([FromRoute] int id)
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
    }
}