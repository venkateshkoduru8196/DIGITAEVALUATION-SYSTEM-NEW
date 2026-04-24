using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IMenuService
    {
        Task<List<MenuDto>> GetMenuByUserIdAsync(string userId);
    }
}
