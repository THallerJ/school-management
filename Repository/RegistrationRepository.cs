using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class RegistrationiRepository(AppDbContext context) : IRegistrationRepository
    {
        private readonly AppDbContext _context = context;
        public async Task<Registration> Create(Registration registration)
        {
            await _context.Registrations.AddAsync(registration);
            await _context.SaveChangesAsync();
            return registration;
        }

        public async Task<Registration?> Delete(Registration registration)
        {
            var registrationModel = await _context.Registrations
                .FirstOrDefaultAsync(reg => reg.CourseId == registration.CourseId && reg.StudentId == registration.StudentId);

            if (registrationModel == null) return null;

            _context.Registrations.Remove(registrationModel);
            await _context.SaveChangesAsync();
            return registrationModel;
        }
    }
}
