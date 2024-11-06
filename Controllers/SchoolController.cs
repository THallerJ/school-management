using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.School;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/school")]
    public class SchoolController(ISchoolRepository schoolRepo) : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepo = schoolRepo;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var schools = await _schoolRepo.Get();
            return Ok(schools);
        }

        [HttpPost("create_school")]
        public async Task<IActionResult> Create([FromBody] CreateSchoolDto schoolDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var schoolModel = schoolDto.ToSchoolFromCreateDto();
            await _schoolRepo.Create(schoolModel);
            return Ok(schoolModel);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteSchool([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.Delete(id);

            if (schoolModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
