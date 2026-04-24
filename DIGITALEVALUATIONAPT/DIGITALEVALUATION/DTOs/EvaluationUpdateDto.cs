using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class EvaluationUpdateDto
    {
        [Required]
        public int EvaluationId { get; set; }

        public decimal TotalMarks { get; set; }

        public string? Remarks { get; set; }
    }
}
