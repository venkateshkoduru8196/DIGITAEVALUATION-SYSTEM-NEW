using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class FacultyCreateDto
    {
        [Required]
        public string EmployeeCode { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; }

        public string? Gender { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Qualification { get; set; }

        [Range(0, 50)]
        public int ExperienceYears { get; set; }

        public DateTime? DateOfJoining { get; set; }

        public string? Designation { get; set; }

        [Required]
        public int BranchId { get; set; }

        [Range(0, 10000000)]
        public decimal Salary { get; set; }
    }
}
