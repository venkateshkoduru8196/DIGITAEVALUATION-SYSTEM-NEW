using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IFacultySubjectService
    {
        Task<IEnumerable<FacultySubjectDto>> GetAllAsync();
        Task<FacultySubjectDto> GetByIdAsync(int id);
        Task<FacultySubjectDto> CreateAsync(FacultySubjectCreateDto dto, string user);
        Task<bool> UpdateAsync(FacultySubjectUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
