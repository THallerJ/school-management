﻿using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Dtos.Teacher;
using school_management.Interface;
using school_management.Models;

namespace school_management.Repository
{
    public class TeacherRepository(AppDbContext context) : ITeacherRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Teacher> Create(Teacher teacherModel)
        {
            await _context.Teachers.AddAsync(teacherModel);
            await _context.SaveChangesAsync();

            return teacherModel;
        }

        public async Task<Teacher?> Delete(int id)
        {
            var teacherModel = await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.Id == id);

            if (teacherModel == null)
            {
                return null;
            }

            _context.Teachers.Remove(teacherModel);
            await _context.SaveChangesAsync();
            return teacherModel;
        }

        public async Task<List<Teacher>> Get()
        {
            var teachers = await _context.Teachers.Include(teacher => teacher.Courses).ToListAsync();
            return teachers;
        }

        public async Task<Teacher?> Put(int id, PutTeacherDto teacherDto)
        {
            var teacherToUpdate = await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.Id == id);

            if (teacherToUpdate == null)
            {
                return null;
            }

            teacherToUpdate.FirstName = teacherDto.FirstName;
            teacherToUpdate.LastName = teacherDto.LastName;
            teacherToUpdate.SchoolId = teacherDto.SchoolId;

            await _context.SaveChangesAsync();

            return teacherToUpdate;
        }

        public async Task<Teacher?> GetById(int id)
        {
            return await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.Id == id);
        }
    }
}
