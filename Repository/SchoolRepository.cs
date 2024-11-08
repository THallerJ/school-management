using Microsoft.EntityFrameworkCore;
using school_management.Data;
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

            if (schoolModel == null)
            {
                return null;
            }

            _context.Schools.Remove(schoolModel);
            await _context.SaveChangesAsync();
            return schoolModel;
        }

        public async Task<List<School>> Get()
        {
            var schools = await _context.Schools.Include(school => school.Courses).ToListAsync();
            return schools;
        }

        public Task<School?> Update(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<School?> GetById(int id)
        {
            return await _context.Schools.FirstOrDefaultAsync(school => school.Id == id);
        }
    }
}
