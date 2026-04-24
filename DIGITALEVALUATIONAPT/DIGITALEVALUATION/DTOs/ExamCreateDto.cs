using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class ExamCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string ExamName { get; set; } = string.Empty;

        [Required]
        public string ExamType { get; set; } = string.Empty; // Internal / External

        [Range(1, 12)]
        public int Semester { get; set; }

        [Required]
        public string AcademicYear { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public int BranchId { get; set; }
    }
}
