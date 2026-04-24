using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllAsync();
        Task<StudentDto> GetByIdAsync(int id);
        Task<StudentDto> CreateAsync(StudentCreateDto dto, string user);
        Task<bool> UpdateAsync(StudentUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
