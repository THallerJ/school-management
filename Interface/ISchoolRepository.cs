using school_management.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace school_management.Interface
{
    public interface ISchoolRepository
    {
        Task<List<School>> Get();
        Task<School> Create(School schoolModel);
        Task<School?> Delete(int id);
    }
}
