﻿using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetAll([FromQuery] SchoolFilter filter)
        {
            var schools = await _schoolRepo.Get(filter);
            var schoolsDto = schools.Select(school => school.ToSchoolDto());
            return Ok(schoolsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.GetById(id);

            if (schoolModel == null) return NotFound();

            return Ok(schoolModel.ToSchoolDto());
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateSchoolDto schoolDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = schoolDto.ToSchoolFromCreateDto();
            await _schoolRepo.Create(schoolModel);
            return CreatedAtAction(nameof(GetById), new { id = schoolModel.Id }, schoolModel.ToSchoolDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.Delete(id);

            if (schoolModel == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] PutSchoolDto schoolDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var schoolModel = await _schoolRepo.Put(id, schoolDto);

            if (schoolModel == null) return NotFound();

            return Ok(schoolModel.ToSchoolDto());
        }
    }
}
