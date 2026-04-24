using DIGITALEVALUATION.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIGITALEVALUATION.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        // GET: api/menu/user/1
        [HttpGet("Menues")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetMenuByUser()
        {
            var userId = (User.FindFirst("uid")!.Value);
            var menus = await _menuService.GetMenuByUserIdAsync(userId);
            return Ok(menus);
        }
    }
}
