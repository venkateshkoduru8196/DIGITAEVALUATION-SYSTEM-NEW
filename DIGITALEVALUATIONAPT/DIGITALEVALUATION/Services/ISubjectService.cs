using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Entities;

namespace DIGITALEVALUATION.Services
{
    public interface ISubjectService
    {
        Task<IEnumerable<SubjectDto>> GetAllAsync();
        Task<SubjectDto> GetByIdAsync(int id);
        Task<SubjectDto> CreateAsync(SubjectCreateDto dto, string user);
        Task<bool> UpdateAsync(SubjectUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
