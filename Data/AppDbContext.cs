using Microsoft.EntityFrameworkCore;
using school_management.Models;
namespace school_management.Data
{
    public class AppDbContext : DbContext 
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Teacher> Teacher { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<School> Schools { get; set; }
    }
}
