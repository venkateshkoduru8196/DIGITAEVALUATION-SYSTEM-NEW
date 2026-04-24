using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class SubjectUpdateDto
    {
        [Required]
        public int SubjectId { get; set; }

        [Required]
        [MaxLength(200)]
        public string SubjectName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? SubjectCode { get; set; }

        public int Credits { get; set; }
        public int MaxMarks { get; set; }
        public int PassingMarks { get; set; }
    }
}
