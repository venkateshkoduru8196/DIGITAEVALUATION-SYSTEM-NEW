using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface ICollegeService
    {
        Task<IEnumerable<CollegeDto>> GetAllAsync();
        Task<CollegeDto?> GetByIdAsync(int id);
        Task<CollegeDto> CreateAsync(CreateCollegeDto dto, string userId);
        Task<bool> UpdateAsync(int id, UpdateCollegeDto dto, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }
}
