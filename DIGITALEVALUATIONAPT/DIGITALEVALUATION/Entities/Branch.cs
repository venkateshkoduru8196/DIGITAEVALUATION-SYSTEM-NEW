namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Branch
    {
        [Key]
        public int BranchId { get; set; }

        [Required]
        public int CollegeId { get; set; }

        [MaxLength(20)]
        public string? BranchCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string BranchName { get; set; } = string.Empty;

        public int? HODFacultyId { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        // Navigation
        [ForeignKey("CollegeId")]
        public College? College { get; set; }
    }
}
