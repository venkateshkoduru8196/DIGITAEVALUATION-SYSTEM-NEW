namespace DIGITALEVALUATION.DTOs
{
    public class ExamDto
    {
        public int ExamId { get; set; }
        public string? ExamName { get; set; }
        public string? ExamType { get; set; }
        public int Semester { get; set; }
        public string? AcademicYear { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int CourseId { get; set; }
        public int BranchId { get; set; }
    }
}
