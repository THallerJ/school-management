using Microsoft.AspNetCore.Mvc;

namespace school_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        [HttpGet(Name = "GetStudent")]

        public int Get()
        {
            return 5;
        }
    }
}
