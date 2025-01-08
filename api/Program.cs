using Microsoft.EntityFrameworkCore;
using school_management.Data;
using school_management.Interface;
using school_management.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

    if (string.IsNullOrEmpty(connectionString))
    {
        connectionString = Environment.GetEnvironmentVariable("DefaultConnection");
    }

    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<ISchoolRepository, SchoolRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<IRegistrationRepository, RegistrationiRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());
} else {
    string acceptedOrigins = Environment.GetEnvironmentVariable("ACCEPTED_ORIGINS") ?? string.Empty;
    
    string[] originsArray = acceptedOrigins.Replace(" ", string.Empty).Split(',');

    app.UseCors(x => x.WithOrigins(originsArray)
        .AllowAnyMethod().AllowAnyHeader());
}

app.UseAuthorization();

app.MapControllers();

app.Run();
