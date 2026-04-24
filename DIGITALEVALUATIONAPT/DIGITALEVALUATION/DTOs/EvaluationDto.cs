namespace DIGITALEVALUATION.DTOs
{
    public class EvaluationDto
    {
        public int EvaluationId { get; set; }
        public int AnswerSheetId { get; set; }
        public int FacultyId { get; set; }
        public decimal? TotalMarks { get; set; }
        public string? Remarks { get; set; }
        public DateTime? EvaluatedDate { get; set; }
    }
}
