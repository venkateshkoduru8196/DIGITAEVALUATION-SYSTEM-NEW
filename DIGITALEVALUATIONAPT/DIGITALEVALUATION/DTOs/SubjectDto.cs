namespace DIGITALEVALUATION.DTOs
{
    public class SubjectDto
    {
        public int SubjectId { get; set; }
        public string? SubjectCode { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public int Credits { get; set; }
        public int MaxMarks { get; set; }
        public int PassingMarks { get; set; }
    }
}
