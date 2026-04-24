using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IFacultyService
    {
        Task<IEnumerable<FacultyDto>> GetAllAsync();
        Task<FacultyDto> GetByIdAsync(int id);
        Task<FacultyDto> CreateAsync(FacultyCreateDto dto, string user);
        Task<bool> UpdateAsync(FacultyUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
