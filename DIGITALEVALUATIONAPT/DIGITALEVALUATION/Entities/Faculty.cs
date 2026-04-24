namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Faculty
    {
        [Key]
        public int FacultyId { get; set; }

        [MaxLength(50)]
        public string? EmployeeCode { get; set; }

        [MaxLength(100)]
        public string? FirstName { get; set; }

        [MaxLength(100)]
        public string? LastName { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(200)]
        public string? Qualification { get; set; }

        public int ExperienceYears { get; set; }

        public DateTime? DateOfJoining { get; set; }

        [MaxLength(100)]
        public string? Designation { get; set; }

        public int BranchId { get; set; }

        public decimal Salary { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        // Navigation
        [ForeignKey("BranchId")]
        public Branch? Branch { get; set; }
    }
}
