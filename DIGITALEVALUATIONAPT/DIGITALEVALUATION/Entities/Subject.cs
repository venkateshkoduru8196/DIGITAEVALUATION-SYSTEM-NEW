using System;
using System.ComponentModel.DataAnnotations;
namespace DIGITALEVALUATION.Entities
{ 
    public class Subject
    {
        [Key]
        public int SubjectId { get; set; }

        public string SubjectCode { get; set; }

        public string SubjectName { get; set; }

        public int Credits { get; set; }

        public int MaxMarks { get; set; }

        public int PassingMarks { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;
    }
}
