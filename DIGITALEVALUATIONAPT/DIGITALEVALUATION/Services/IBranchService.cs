using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IBranchService
    {
        Task<IEnumerable<BranchDto>> GetAllAsync();
        Task<BranchDto> GetByIdAsync(int id);
        Task<BranchDto> CreateAsync(BranchCreateDto dto, string user);
        Task<bool> UpdateAsync(BranchUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
