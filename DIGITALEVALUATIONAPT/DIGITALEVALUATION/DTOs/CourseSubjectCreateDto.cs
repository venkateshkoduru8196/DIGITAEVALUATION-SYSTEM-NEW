using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class CourseSubjectCreateDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public int BranchId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Range(1, 12)]
        public int Semester { get; set; }

        public bool IsElective { get; set; }
    }
}
