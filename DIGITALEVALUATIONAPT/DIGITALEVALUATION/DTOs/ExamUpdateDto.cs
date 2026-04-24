using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class ExamUpdateDto
    {
        [Required]
        public int ExamId { get; set; }

        [Required]
        public string ExamName { get; set; } = string.Empty;

        public string? ExamType { get; set; }

        public int Semester { get; set; }

        public string? AcademicYear { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int CourseId { get; set; }
        public int BranchId { get; set; }
    }
}
