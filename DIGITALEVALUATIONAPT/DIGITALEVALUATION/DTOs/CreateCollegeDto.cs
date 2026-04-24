namespace DIGITALEVALUATION.DTOs
{
    public class CreateCollegeDto
    {
        public string? CollegeCode { get; set; }
        public string CollegeName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? Pincode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
    }
}
