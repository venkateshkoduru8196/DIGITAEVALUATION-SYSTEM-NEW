namespace DIGITALEVALUATION.DTOs
{
    public class FacultySubjectDto
    {
        public int Id { get; set; }
        public int FacultyId { get; set; }
        public int SubjectId { get; set; }
        public int Semester { get; set; }
        public string? AcademicYear { get; set; }
    }
}
