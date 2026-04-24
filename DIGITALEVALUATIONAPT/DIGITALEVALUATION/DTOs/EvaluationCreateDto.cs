using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class EvaluationCreateDto
    {
        [Required]
        public int AnswerSheetId { get; set; }

        [Required]
        public int FacultyId { get; set; }

        [Range(0, 1000)]
        public decimal TotalMarks { get; set; }

        public string? Remarks { get; set; }
    }
}
