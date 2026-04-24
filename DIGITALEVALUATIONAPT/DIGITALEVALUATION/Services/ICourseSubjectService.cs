using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface ICourseSubjectService
    {
        Task<IEnumerable<CourseSubjectDto>> GetAllAsync();
        Task<CourseSubjectDto> GetByIdAsync(int id);
        Task<CourseSubjectDto> CreateAsync(CourseSubjectCreateDto dto, string user);
        Task<bool> UpdateAsync(CourseSubjectUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
