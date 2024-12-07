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

        public async Task<School> CreateSchool(School schoolModel)
        {
            await _context.Schools.AddAsync(schoolModel);
            await _context.SaveChangesAsync();
            return schoolModel;
        }

        public async Task<School?> DeleteSchool(int id)
        {
            var schoolModel = await _context.Schools.FirstOrDefaultAsync(school => school.Id == id);

            if (schoolModel == null) return null;

            _context.Schools.Remove(schoolModel);
            await _context.SaveChangesAsync();
            return schoolModel;
        }

        public async Task<List<School>> GetSchools(SchoolFilter filter)
        {
            var schools = _context.Schools.Include(school => school.Courses)
                .ThenInclude(course => course.Teacher).Include(school => school.Courses)
                .ThenInclude(course => course.Registrations)
                .ThenInclude(reg => reg.Student).AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Name))
                schools = schools.Where(school => school.Name.Contains(filter.Name));

            if (!string.IsNullOrWhiteSpace(filter.Address))
                schools = schools.Where(school => school.Address.Equals(filter.Address));

            if (!string.IsNullOrWhiteSpace(filter.PhoneNumber))
                schools = schools.Where(school => school.PhoneNumber.Equals(filter.PhoneNumber));

            schools = schools.OrderBy(id => id);

            if (filter.DisablePaging) {
                schools = schools.Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            }

            return await schools.ToListAsync();
/*
            return await schools.OrderBy(id => id).Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).ToListAsync(); */
        }

        public async Task<School?> UpdateSchool(int id, PutSchoolDto schoolDto)
        {

            var schoolToUpdate = await _context.Schools
                .FirstOrDefaultAsync(school => school.Id == id);

            if (schoolToUpdate == null) return null;
        
            schoolToUpdate.PhoneNumber = schoolDto.PhoneNumber;
            schoolToUpdate.Address = schoolDto.Address;
            schoolToUpdate.Name = schoolDto.Name;

            await _context.SaveChangesAsync();

            return schoolToUpdate;
        }

        public async Task<School?> GetSchoolById(int id)
        {
            return await _context.Schools.Include(school => school.Courses)
                .ThenInclude(course => course.Teacher).Include(school => school.Courses)
                .ThenInclude(course => course.Registrations)
                .ThenInclude(reg => reg.Student)
                .FirstOrDefaultAsync(school => school.Id == id);
        }
    }
}
