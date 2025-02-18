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

        public async Task<Teacher> CreateTeacher(Teacher teacherModel)
        {
            await _context.Teachers.AddAsync(teacherModel);
            await _context.SaveChangesAsync();

            return teacherModel;
        }

        public async Task<Teacher?> DeleteTeacher(int id)
        {
            var teacherModel = await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.Id == id);

            if (teacherModel == null) return null;

            _context.Teachers.Remove(teacherModel);
            await _context.SaveChangesAsync();
            return teacherModel;
        }

        public async Task<List<Teacher>> GetTeachers(TeacherFilter filter)
        {
            var teachers = _context.Teachers.Include(teacher => teacher.School)
                .Include(teacher => teacher.Courses).ThenInclude(course => course.Registrations)
                .ThenInclude(reg => reg.Student).AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.FirstName))
                teachers = teachers.Where(teacher => teacher.FirstName.Contains(filter.FirstName));

            if (!string.IsNullOrWhiteSpace(filter.LastName))
                teachers = teachers.Where(teacher => teacher.LastName.Equals(filter.LastName));

            if (filter.SchoolId != null)
                teachers = teachers.Where(teacher => teacher.SchoolId.Equals(filter.SchoolId));

           // return await teachers.OrderBy(id => id).Skip((filter.PageNumber - 1) * filter.PageSize)
             //   .Take(filter.PageSize).ToListAsync();

            teachers = teachers.OrderBy(id => id);

            if (!filter.DisablePaging) {
                teachers = teachers.Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            }

            return await teachers.ToListAsync();
        }

        public async Task<Teacher?> UpdateTeacher(int id, PutTeacherDto teacherDto)
        {
            var teacherToUpdate = await _context.Teachers
                .FirstOrDefaultAsync(teacher => teacher.Id == id);

            if (teacherToUpdate == null) return null;

            teacherToUpdate.FirstName = teacherDto.FirstName;
            teacherToUpdate.LastName = teacherDto.LastName;
            teacherToUpdate.SchoolId = teacherDto.SchoolId;

            await _context.SaveChangesAsync();

            return teacherToUpdate;
        }

        public async Task<Teacher?> GetTeacherById(int id)
        {
            return await _context.Teachers.Include(teacher => teacher.School)
                .Include(teacher => teacher.Courses).ThenInclude(course => course.Registrations)
                .ThenInclude(reg => reg.Student).FirstOrDefaultAsync(teacher => teacher.Id == id);
        }
    }
}
