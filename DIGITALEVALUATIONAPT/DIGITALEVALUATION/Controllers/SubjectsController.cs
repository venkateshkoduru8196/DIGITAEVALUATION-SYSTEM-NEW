using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Entities;
using DIGITALEVALUATION.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace DIGITALEVALUATION.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectService _service;

        public SubjectsController(ISubjectService service)
        {
            _service = service;
        }

        private string GetUser()
        {
            return User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "System";
        }

        // GET ALL
        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        // GET BY ID
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _service.GetByIdAsync(id);
            return Ok(data);
        }

        // CREATE
        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Create([FromBody] SubjectCreateDto dto)
        {
            var user = GetUser();
            var data = await _service.CreateAsync(dto, user);
            return Ok(data);
        }

        // UPDATE
        [HttpPut]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Update([FromBody] SubjectUpdateDto dto)
        {
            var user = GetUser();
            await _service.UpdateAsync(dto, user);
            return Ok("Updated successfully");
        }

        // DELETE (Soft Delete)
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