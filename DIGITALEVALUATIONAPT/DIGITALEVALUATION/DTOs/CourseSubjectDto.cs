namespace DIGITALEVALUATION.DTOs
{
    public class CourseSubjectDto
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int BranchId { get; set; }
        public int SubjectId { get; set; }
        public int Semester { get; set; }
        public bool IsElective { get; set; }
    }
}
