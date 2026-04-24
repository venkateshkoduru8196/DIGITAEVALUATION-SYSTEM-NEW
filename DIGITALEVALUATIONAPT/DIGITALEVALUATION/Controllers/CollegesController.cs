using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
[ApiController]
[Route("api/[controller]")]
public class CollegesController : ControllerBase
{
    private readonly ICollegeService _service;
    private readonly ILogger<CollegesController> _logger;

    public CollegesController(ICollegeService service, ILogger<CollegesController> logger)
    {
        _service = service;
        _logger = logger;
    }

    // GET ALL
    [HttpGet]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> GetAll()
    { 
        try
        {
            _logger.LogInformation("GetAll Colleges API called");

            var data = await _service.GetAllAsync();

            _logger.LogInformation("Returned {Count} colleges", data?.Count() ?? 0);

            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetAll Colleges");

            return StatusCode(500, new
            {
                success = false,
                message = "Internal server error"
            });
        }
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            _logger.LogInformation("Get College by Id: {Id}", id);

            var data = await _service.GetByIdAsync(id);

            if (data == null)
            {
                _logger.LogWarning("College not found for Id: {Id}", id);
                return NotFound(new
                {
                    success = false,
                    message = $"College with Id {id} not found"
                });
            }

            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in Get College by Id: {Id}", id);

            return StatusCode(500, new
            {
                success = false,
                message = "Internal server error"
            });
        }
    }

    // CREATE
    [HttpPost]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Create(CreateCollegeDto dto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogWarning("Create failed - UserId missing in token");
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid token"
                });
            }

            _logger.LogInformation("User {UserId} creating college", userId);

            var result = await _service.CreateAsync(dto, userId);

            _logger.LogInformation("College created with Id: {Id} by User: {UserId}", result.CollegeId, userId);

            return CreatedAtAction(nameof(Get), new { id = result.CollegeId }, result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in Create College");

            return StatusCode(500, new
            {
                success = false,
                message = "Internal server error"
            });
        }
    }

    // UPDATE
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Update(int id, UpdateCollegeDto dto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogWarning("Update failed - UserId missing in token");
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid token"
                });
            }

            _logger.LogInformation("User {UserId} updating college Id: {Id}", userId, id);

            var updated = await _service.UpdateAsync(id, dto, userId);

            if (!updated)
            {
                _logger.LogWarning("Update failed - College not found Id: {Id}", id);

                return NotFound(new
                {
                    success = false,
                    message = $"College with Id {id} not found"
                });
            }

            _logger.LogInformation("College updated successfully Id: {Id} by User: {UserId}", id, userId);

            return Ok(new
            {
                success = true,
                message = "Updated successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in Update College Id: {Id}", id);

            return StatusCode(500, new
            {
                success = false,
                message = "Internal server error"
            });
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogWarning("Delete failed - UserId missing in token");
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid token"
                });
            }

            _logger.LogInformation("User {UserId} deleting college Id: {Id}", userId, id);

            var deleted = await _service.DeleteAsync(id, userId);

            if (!deleted)
            {
                _logger.LogWarning("Delete failed - College not found Id: {Id}", id);

                return NotFound(new
                {
                    success = false,
                    message = $"College with Id {id} not found"
                });
            }

            _logger.LogInformation("College deleted successfully Id: {Id} by User: {UserId}", id, userId);

            return Ok(new
            {
                success = true,
                message = "Deleted successfully",
                deletedBy = userId
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in Delete College Id: {Id}", id);

            return StatusCode(500, new
            {
                success = false,
                message = "Internal server error"
            });
        }
    }
}