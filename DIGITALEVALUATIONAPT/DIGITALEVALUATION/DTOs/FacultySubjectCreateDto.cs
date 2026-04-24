using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class FacultySubjectCreateDto
    {
        [Required]
        public int FacultyId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Range(1, 12)]
        public int Semester { get; set; }

        [Required]
        [MaxLength(20)]
        public string AcademicYear { get; set; } = string.Empty;
    }
}
