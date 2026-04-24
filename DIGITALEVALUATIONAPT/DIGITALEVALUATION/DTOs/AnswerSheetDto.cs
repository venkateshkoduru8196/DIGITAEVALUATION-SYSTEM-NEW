namespace DIGITALEVALUATION.DTOs
{
    public class AnswerSheetDto
    {
        public int AnswerSheetId { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public int ExamId { get; set; }
        public string? FilePath { get; set; }
        public string? FileType { get; set; }
        public string? Status { get; set; }
    }
}
