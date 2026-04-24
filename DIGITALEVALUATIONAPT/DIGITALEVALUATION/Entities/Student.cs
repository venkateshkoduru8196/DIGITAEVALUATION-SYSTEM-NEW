namespace DIGITALEVALUATION.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Student
    {
        [Key]
        public int StudentId { get; set; }

        [MaxLength(50)]
        public string? RollNumber { get; set; }

        [MaxLength(50)]
        public string? RegistrationNumber { get; set; }

        [MaxLength(100)]
        public string? FirstName { get; set; }

        [MaxLength(100)]
        public string? LastName { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        public DateTime? DOB { get; set; }

        [MaxLength(10)]
        public string? BloodGroup { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? State { get; set; }

        [MaxLength(10)]
        public string? Pincode { get; set; }

        public int CourseId { get; set; }
        public int BranchId { get; set; }

        public int AdmissionYear { get; set; }
        public int CurrentSemester { get; set; }

        [MaxLength(200)]
        public string? ParentName { get; set; }

        [MaxLength(20)]
        public string? ParentPhone { get; set; }

        [MaxLength(20)]
        public string? Status { get; set; }

        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        // Navigation
        [ForeignKey("CourseId")]
        public Course? Course { get; set; }

        [ForeignKey("BranchId")]
        public Branch? Branch { get; set; }
    }
}
