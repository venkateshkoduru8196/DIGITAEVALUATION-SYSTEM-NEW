using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IExamService
    {
        Task<IEnumerable<ExamDto>> GetAllAsync();
        Task<ExamDto> GetByIdAsync(int id);
        Task<ExamDto> CreateAsync(ExamCreateDto dto, string user);
        Task<bool> UpdateAsync(ExamUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
