namespace DIGITALEVALUATION.DTOs
{
    public class CollegeDto
    {
        public int CollegeId { get; set; }
        public string? CollegeCode { get; set; }
        public string CollegeName { get; set; } = string.Empty;
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public bool IsActive { get; set; }
    }
}
