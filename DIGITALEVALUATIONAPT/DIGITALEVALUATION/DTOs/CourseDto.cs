namespace DIGITALEVALUATION.DTOs
{
    public class CourseDto
    {
        public int CourseId { get; set; }
        public string? CourseCode { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public int DurationYears { get; set; }
        public int TotalSemesters { get; set; }
    }
}
