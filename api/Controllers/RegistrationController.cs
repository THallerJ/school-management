using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Course;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/registration")]
    public class Registration(IRegistrationRepository registrationRepo) : ControllerBase
    {
        private readonly IRegistrationRepository _registrationRepo = registrationRepo;


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegistrationDto registrationDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _registrationRepo.Create(registrationDto.ToRegistrationFromDto());
            return Created();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] RegistrationDto registrationDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = await _registrationRepo.Delete(registrationDto.ToRegistrationFromDto());

            if (courseModel == null) return NotFound();

            return NoContent();
        }
    }
}
