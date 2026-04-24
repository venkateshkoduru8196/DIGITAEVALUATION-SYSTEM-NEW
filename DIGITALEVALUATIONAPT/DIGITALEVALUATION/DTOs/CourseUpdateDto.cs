using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class CourseUpdateDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(100)]
        public string CourseName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? CourseCode { get; set; }

        public int DurationYears { get; set; }
        public int TotalSemesters { get; set; }
    }
}
