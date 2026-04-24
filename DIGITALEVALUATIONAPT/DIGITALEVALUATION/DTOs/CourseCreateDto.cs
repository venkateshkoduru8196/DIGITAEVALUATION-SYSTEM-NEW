using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class CourseCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string CourseName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? CourseCode { get; set; }

        [Range(1, 10)]
        public int DurationYears { get; set; }

        [Range(1, 20)]
        public int TotalSemesters { get; set; }
    }
}
