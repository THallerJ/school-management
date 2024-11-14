using Microsoft.EntityFrameworkCore;
using school_management.Mappers;
using school_management.Models;
namespace school_management.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options) 
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Registration>(a => a.HasKey(b => new { b.CourseId, b.StudentId }));


            modelBuilder.Entity<Registration>()
                .HasOne(a => a.Student)
                .WithMany(a => a.Registrations)
                .HasForeignKey(a => a.StudentId);

            modelBuilder.Entity<Registration>()
                .HasOne(a => a.Course)
                .WithMany(a => a.Registrations)
                .HasForeignKey(a => a.CourseId);
        }
        
        public DbSet<Course> Courses { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<School> Schools { get; set; }
    }
}
