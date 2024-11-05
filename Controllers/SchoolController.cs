using Microsoft.AspNetCore.Mvc;
using school_management.Data;
using school_management.Dtos.School;
using school_management.Mappers;
using school_management.Models;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/school")]
    public class SchoolController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet("get_all")]
        public IActionResult GetAll()
        {
            List<School> schools = [.. _context.Schools];
            return Ok(schools);

        }

        [HttpPost("create_school")]
        public IActionResult Create([FromBody] CreateSchoolDto schoolDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var schoolModel = schoolDto.ToSchoolFromCreateDto();
            _context.Schools.Add(schoolModel);
            _context.SaveChanges();
            return Ok(schoolModel);
        }
    }
}
