namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Exam
    {
        [Key]
        public int ExamId { get; set; }

        [MaxLength(100)]
        public string? ExamName { get; set; }

        [MaxLength(50)]
        public string? ExamType { get; set; } // Internal / External

        public int Semester { get; set; }

        [MaxLength(20)]
        public string? AcademicYear { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int CourseId { get; set; }
        public int BranchId { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        // Navigation
        [ForeignKey("CourseId")]
        public Course? Course { get; set; }

        [ForeignKey("BranchId")]
        public Branch? Branch { get; set; }
    }
}
