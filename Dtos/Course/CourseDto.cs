using NuGet.Protocol.Plugins;
using school_management.Dtos.School;
using school_management.Dtos.Student;
using school_management.Dtos.Teacher;
using school_management.Models;

namespace school_management.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public NestedSchoolDto? School { get; set; }

        public NestedTeacherDto? Teacher { get; set; }

       public List<RegistrationDto> Registrations { get; set; } = new List<RegistrationDto>();
    }
}
