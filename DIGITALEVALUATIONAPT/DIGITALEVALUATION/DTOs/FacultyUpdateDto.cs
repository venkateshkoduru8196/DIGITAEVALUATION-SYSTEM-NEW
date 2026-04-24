using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class FacultyUpdateDto
    {
        [Required]
        public int FacultyId { get; set; }

        [Required]
        public string EmployeeCode { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; }

        public string? Gender { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Qualification { get; set; }

        public int ExperienceYears { get; set; }

        public DateTime? DateOfJoining { get; set; }

        public string? Designation { get; set; }

        public int BranchId { get; set; }

        public decimal Salary { get; set; }
    }
}
