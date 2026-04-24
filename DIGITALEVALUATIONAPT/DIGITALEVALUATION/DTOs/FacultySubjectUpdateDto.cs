using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class FacultySubjectUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int FacultyId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        public int Semester { get; set; }

        public string? AcademicYear { get; set; }
    }
}
