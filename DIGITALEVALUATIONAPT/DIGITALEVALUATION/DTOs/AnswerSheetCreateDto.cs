using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class AnswerSheetCreateDto
    {
        [Required]
        public int StudentId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public int ExamId { get; set; }

        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
