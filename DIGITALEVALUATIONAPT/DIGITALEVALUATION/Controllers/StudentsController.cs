using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIGITALEVALUATION.Controllers
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentsController(IStudentService service)
        {
            _service = service;
        }

        private string GetUser()
        {
            return User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "System";
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Create(StudentCreateDto dto)
        {
            var user = GetUser();
            return Ok(await _service.CreateAsync(dto, user));
        }

        [HttpPut]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Update(StudentUpdateDto dto)
        {
            var user = GetUser();
            await _service.UpdateAsync(dto, user);
            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = GetUser();
            await _service.DeleteAsync(id, user);
            return Ok("Deleted successfully");
        }
    }
}
