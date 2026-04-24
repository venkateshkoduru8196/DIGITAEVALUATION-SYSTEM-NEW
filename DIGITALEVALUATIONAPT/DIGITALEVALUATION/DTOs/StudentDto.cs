namespace DIGITALEVALUATION.DTOs
{
    public class StudentDto
    {
        public int StudentId { get; set; }
        public string? RollNumber { get; set; }
        public string? RegistrationNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int CourseId { get; set; }
        public int BranchId { get; set; }
        public int CurrentSemester { get; set; }
        public string? Status { get; set; }
    }
}
