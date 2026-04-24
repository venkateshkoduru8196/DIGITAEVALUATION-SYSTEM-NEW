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
    public class BranchesController : ControllerBase
    {
        private readonly IBranchService _service;

        public BranchesController(IBranchService service)
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
        public async Task<IActionResult> Create([FromBody] BranchCreateDto dto)
        {
            var user = GetUser();
            var data = await _service.CreateAsync(dto, user);
            return Ok(data);
        }

        // UPDATE
        [HttpPut]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Update([FromBody] BranchUpdateDto dto)
        {
            var user = GetUser();
            await _service.UpdateAsync(dto, user);
            return Ok("Updated successfully");
        }

        // DELETE
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
