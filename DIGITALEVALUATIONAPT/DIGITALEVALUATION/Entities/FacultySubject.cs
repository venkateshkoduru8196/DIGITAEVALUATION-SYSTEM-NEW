namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FacultySubject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int FacultyId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        public int Semester { get; set; }

        [MaxLength(20)]
        public string? AcademicYear { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        // Navigation
        [ForeignKey("FacultyId")]
        public Faculty? Faculty { get; set; }

        [ForeignKey("SubjectId")]
        public Subject? Subject { get; set; }
    }
}
