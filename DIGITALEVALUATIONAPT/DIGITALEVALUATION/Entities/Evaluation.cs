namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Evaluation
    {
        [Key]
        public int EvaluationId { get; set; }

        public int AnswerSheetId { get; set; }
        public int FacultyId { get; set; }

        public decimal? TotalMarks { get; set; }

        [MaxLength(500)]
        public string? Remarks { get; set; }

        public DateTime? EvaluatedDate { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        [ForeignKey("AnswerSheetId")]
        public AnswerSheet? AnswerSheet { get; set; }

        [ForeignKey("FacultyId")]
        public Faculty? Faculty { get; set; }
    }
}
