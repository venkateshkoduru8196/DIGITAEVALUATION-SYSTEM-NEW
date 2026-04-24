namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [MaxLength(20)]
        public string? CourseCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string CourseName { get; set; } = string.Empty;

        public int DurationYears { get; set; }
        public int TotalSemesters { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }
}
