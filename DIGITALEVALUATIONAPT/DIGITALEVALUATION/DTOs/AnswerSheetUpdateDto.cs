using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class AnswerSheetUpdateDto
    {
        [Required]
        public int AnswerSheetId { get; set; }

        public string? Status { get; set; }
    }
}
