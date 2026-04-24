using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IEvaluationService
    {
        Task<IEnumerable<EvaluationDto>> GetAllAsync();
        Task<EvaluationDto> GetByIdAsync(int id);
        Task<EvaluationDto> CreateAsync(EvaluationCreateDto dto, string user);
        Task<bool> UpdateAsync(EvaluationUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
