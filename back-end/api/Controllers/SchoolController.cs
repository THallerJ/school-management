using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Common;
using school_management.Dtos.School;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/schools")]
    public class SchoolController(ISchoolRepository schoolRepo) : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepo = schoolRepo;

        [HttpGet]
        public async Task<IActionResult> GetSchools([FromQuery] SchoolFilter filter)
        {
            var schools = await _schoolRepo.GetSchools(filter);
            if (filter.DisablePaging) {
                var schoolsDtoNoPaging = schools.Select(school => school.ToSchoolDtoNoPaging());
                return Ok(schoolsDtoNoPaging);
            } else {
                var schoolsDto = schools.Select(school => school.ToSchoolDto());
                return Ok(schoolsDto);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetSchoolById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.GetSchoolById(id);

            if (schoolModel == null) return NotFound();

            return Ok(schoolModel.ToSchoolDto());
        }


        [HttpPost]
        public async Task<IActionResult> CreateSchool([FromBody] CreateSchoolDto schoolDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = schoolDto.ToSchoolFromCreateDto();
            await _schoolRepo.CreateSchool(schoolModel);

            return CreatedAtAction(nameof(GetSchoolById), new { id = schoolModel.Id }, schoolModel.ToCreateSchoolRespDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteSchool([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.DeleteSchool(id);

            if (schoolModel == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateSchool([FromRoute] int id, [FromBody] PutSchoolDto schoolDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var schoolModel = await _schoolRepo.UpdateSchool(id, schoolDto);

            if (schoolModel == null) return NotFound();

            return Ok(schoolModel.ToSchoolDto());
        }
    }
}
