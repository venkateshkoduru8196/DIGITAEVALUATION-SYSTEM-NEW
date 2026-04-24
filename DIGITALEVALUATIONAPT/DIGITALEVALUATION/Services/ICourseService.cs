using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllAsync();
        Task<CourseDto> GetByIdAsync(int id);
        Task<CourseDto> CreateAsync(CourseCreateDto dto, string user);
        Task<bool> UpdateAsync(CourseUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
