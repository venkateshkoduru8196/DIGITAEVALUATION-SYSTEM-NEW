using DIGITALEVALUATION.DTOs;

namespace DIGITALEVALUATION.Services
{
    public interface IAnswerSheetService
    {
        Task<IEnumerable<AnswerSheetDto>> GetAllAsync();
        Task<AnswerSheetDto> GetByIdAsync(int id);
        Task<AnswerSheetDto> UploadAsync(AnswerSheetCreateDto dto, string user);
        Task<bool> UpdateStatusAsync(AnswerSheetUpdateDto dto, string user);
        Task<bool> DeleteAsync(int id, string user);
    }
}
