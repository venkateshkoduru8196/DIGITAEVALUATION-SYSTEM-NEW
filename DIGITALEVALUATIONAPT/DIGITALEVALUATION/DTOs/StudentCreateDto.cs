using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.DTOs
{
    public class StudentCreateDto
    {
        [Required]
        public string RollNumber { get; set; } = string.Empty;

        public string? RegistrationNumber { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; }

        public string? Gender { get; set; }

        public DateTime? DOB { get; set; }

        public string? BloodGroup { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Pincode { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public int BranchId { get; set; }

        public int AdmissionYear { get; set; }

        public int CurrentSemester { get; set; }

        public string? ParentName { get; set; }

        public string? ParentPhone { get; set; }

        public string? Status { get; set; }
    }
}
