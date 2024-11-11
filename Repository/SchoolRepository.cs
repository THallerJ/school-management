using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Dtos.School;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class SchoolRepository(AppDbContext context) : ISchoolRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<School> Create(School schoolModel)
        {
            await _context.Schools.AddAsync(schoolModel);
            await _context.SaveChangesAsync();
            return schoolModel;
        }

        public async Task<School?> Delete(int id)
        {
            var schoolModel = await _context.Schools.FirstOrDefaultAsync(school => school.Id == id);

            if (schoolModel == null) return null;
            
            _context.Schools.Remove(schoolModel);
            await _context.SaveChangesAsync();
            return schoolModel;
        }

        public async Task<List<School>> Get(SchoolFilter filter)
        {
            var schools = _context.Schools.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Name))
                schools = schools.Where(school => school.Name.Contains(filter.Name));

            if (!string.IsNullOrWhiteSpace(filter.Address))
                schools = schools.Where(school => school.Address.Equals(filter.Address));

            if (!string.IsNullOrWhiteSpace(filter.PhoneNumber))
                schools = schools.Where(school => school.PhoneNumber.Equals(filter.PhoneNumber));

            return await schools.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
        }

        public async Task<School?> Put(int id, PutSchoolDto schoolDto)
        {
            var schoolToUpdate = await _context.Schools.FirstOrDefaultAsync(school => school.Id == id);

            if (schoolToUpdate == null) return null;
            
            schoolToUpdate.PhoneNumber = schoolDto.PhoneNumber;
            schoolToUpdate.Address = schoolDto.Address;
            schoolToUpdate.Name = schoolDto.Name;

            await _context.SaveChangesAsync();

            return schoolToUpdate;
        }

        public async Task<School?> GetById(int id)
        {
            return await _context.Schools.FirstOrDefaultAsync(school => school.Id == id);
        }
    }
}
