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
    public class AnswerSheetsController : ControllerBase
    {
        private readonly IAnswerSheetService _service;

        public AnswerSheetsController(IAnswerSheetService service)
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

        // FILE UPLOAD
        [HttpPost("upload")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> Upload([FromForm] AnswerSheetCreateDto dto)
        {
            var user = GetUser();
            return Ok(await _service.UploadAsync(dto, user));
        }

        // UPDATE STATUS
        [HttpPut("status")]
        [Authorize(Roles = "Admin,Faculty,User")]
        public async Task<IActionResult> UpdateStatus([FromBody] AnswerSheetUpdateDto dto)
        {
            var user = GetUser();
            await _service.UpdateStatusAsync(dto, user);
            return Ok("Status updated");
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
