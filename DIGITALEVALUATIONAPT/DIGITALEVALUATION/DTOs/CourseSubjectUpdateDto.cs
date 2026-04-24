using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class CourseSubjectUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public int BranchId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        public int Semester { get; set; }

        public bool IsElective { get; set; }
    }
}
