﻿using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class SchoolRepository(AppDbContext context) : ISchoolRepository
    {
        AppDbContext _context = context;

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
            List<School> schools = await _context.Schools.ToListAsync();
            return schools;
        }

        public Task<School?> Update(int id)
        {
            throw new NotImplementedException();
        }
    }
}
