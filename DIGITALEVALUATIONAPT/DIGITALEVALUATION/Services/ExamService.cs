namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class ExamService : IExamService
    {
        private readonly ApplicationDbContext _context;

        public ExamService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExamDto>> GetAllAsync()
        {
            return await _context.Exams
                .Where(x => !x.IsDeleted)
                .Select(x => new ExamDto
                {
                    ExamId = x.ExamId,
                    ExamName = x.ExamName,
                    ExamType = x.ExamType,
                    Semester = x.Semester,
                    AcademicYear = x.AcademicYear,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    CourseId = x.CourseId,
                    BranchId = x.BranchId
                }).ToListAsync();
        }

        public async Task<ExamDto> GetByIdAsync(int id)
        {
            var exam = await _context.Exams.FindAsync(id);

            if (exam == null || exam.IsDeleted)
                throw new NotFoundException("Exam not found");

            return new ExamDto
            {
                ExamId = exam.ExamId,
                ExamName = exam.ExamName,
                ExamType = exam.ExamType,
                Semester = exam.Semester,
                AcademicYear = exam.AcademicYear,
                StartDate = exam.StartDate,
                EndDate = exam.EndDate,
                CourseId = exam.CourseId,
                BranchId = exam.BranchId
            };
        }

        public async Task<ExamDto> CreateAsync(ExamCreateDto dto, string user)
        {
            await ValidateFK(dto.CourseId, dto.BranchId);

            // Business validations
            if (dto.StartDate > dto.EndDate)
                throw new Exception("StartDate cannot be greater than EndDate");

            if (!new[] { "Internal", "External" }.Contains(dto.ExamType))
                throw new Exception("Invalid ExamType");

            var exam = new Exam
            {
                ExamName = dto.ExamName,
                ExamType = dto.ExamType,
                Semester = dto.Semester,
                AcademicYear = dto.AcademicYear,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                CourseId = dto.CourseId,
                BranchId = dto.BranchId,
                CreatedBy = user
            };

            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(exam.ExamId);
        }

        public async Task<bool> UpdateAsync(ExamUpdateDto dto, string user)
        {
            var exam = await _context.Exams.FindAsync(dto.ExamId);

            if (exam == null || exam.IsDeleted)
                throw new NotFoundException("Exam not found");

            await ValidateFK(dto.CourseId, dto.BranchId);

            if (dto.StartDate > dto.EndDate)
                throw new Exception("Invalid date range");

            exam.ExamName = dto.ExamName;
            exam.ExamType = dto.ExamType;
            exam.Semester = dto.Semester;
            exam.AcademicYear = dto.AcademicYear;
            exam.StartDate = dto.StartDate;
            exam.EndDate = dto.EndDate;
            exam.CourseId = dto.CourseId;
            exam.BranchId = dto.BranchId;
            exam.UpdatedBy = user;
            exam.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var exam = await _context.Exams.FindAsync(id);

            if (exam == null)
                throw new NotFoundException("Exam not found");

            exam.IsDeleted = true;
            exam.UpdatedBy = user;
            exam.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateFK(int courseId, int branchId)
        {
            if (!await _context.Courses.AnyAsync(x => x.CourseId == courseId && !x.IsDeleted))
                throw new Exception("Invalid CourseId");

            if (!await _context.Branches.AnyAsync(x => x.BranchId == branchId && !x.IsDeleted))
                throw new Exception("Invalid BranchId");
        }
    }
}
