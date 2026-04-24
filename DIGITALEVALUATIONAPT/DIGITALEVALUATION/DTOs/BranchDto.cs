namespace DIGITALEVALUATION.DTOs
{
    public class BranchDto
    {
        public int BranchId { get; set; }
        public int CollegeId { get; set; }
        public string? BranchCode { get; set; }
        public string BranchName { get; set; } = string.Empty;
        public int? HODFacultyId { get; set; }
    }
}
