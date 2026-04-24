using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class SubjectCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string SubjectName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? SubjectCode { get; set; }

        [Range(1, 10)]
        public int Credits { get; set; }

        [Range(1, 1000)]
        public int MaxMarks { get; set; }

        [Range(1, 1000)]
        public int PassingMarks { get; set; }
    }
}
