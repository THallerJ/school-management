using Microsoft.AspNetCore.Mvc;
using school_management.Dtos.Course;
using school_management.Interface;
using school_management.Mappers;

namespace school_management.Controllers
{
    [ApiController]
    [Route("api/registrations")]
    public class Registration(IRegistrationRepository registrationRepo) : ControllerBase
    {
        private readonly IRegistrationRepository _registrationRepo = registrationRepo;


        [HttpPost]
        public async Task<IActionResult> CreateRegistration([FromBody] RegistrationDto registrationDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _registrationRepo.CreateRegistration(registrationDto.ToRegistrationFromDto());
            return Created();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRegistration([FromBody] RegistrationDto registrationDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var courseModel = await _registrationRepo.DeleteRegistration(registrationDto.ToRegistrationFromDto());

            if (courseModel == null) return NotFound();

            return NoContent();
        }
    }
}
