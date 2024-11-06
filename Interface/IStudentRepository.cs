﻿using school_management.Models;

namespace school_management.Interface
{
    public interface IStudentRepository
    {
        Task<List<Student>> Get();
        Task<Student> Create(Student studentModel);
        Task<Student?> Delete(int id);
        Task<Student?> Update(int id);

    }
}
