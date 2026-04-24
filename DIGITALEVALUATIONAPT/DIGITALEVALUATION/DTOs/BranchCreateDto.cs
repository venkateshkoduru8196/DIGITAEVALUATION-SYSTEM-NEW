using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class BranchCreateDto
    {
        [Required]
        public int CollegeId { get; set; }

        [Required]
        [MaxLength(100)]
        public string BranchName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? BranchCode { get; set; }

        public int? HODFacultyId { get; set; }
    }
}
