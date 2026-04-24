namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class AnswerSheet
    {
        [Key]
        public int AnswerSheetId { get; set; }

        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public int ExamId { get; set; }

        [MaxLength(500)]
        public string? FilePath { get; set; }

        [MaxLength(50)]
        public string? FileType { get; set; } // PDF/Image

        [MaxLength(20)]
        public string? Status { get; set; } // Uploaded / Assigned / Evaluated

        public DateTime UploadedDate { get; set; } = DateTime.Now;

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        [ForeignKey("StudentId")]
        public Student? Student { get; set; }

        [ForeignKey("SubjectId")]
        public Subject? Subject { get; set; }

        [ForeignKey("ExamId")]
        public Exam? Exam { get; set; }
    }
}
