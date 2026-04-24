namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class CourseSubjectService : ICourseSubjectService
    {
        private readonly ApplicationDbContext _context;

        public CourseSubjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseSubjectDto>> GetAllAsync()
        {
            return await _context.CourseSubjects
                .Where(x => !x.IsDeleted)
                .Select(x => new CourseSubjectDto
                {
                    Id = x.Id,
                    CourseId = x.CourseId,
                    BranchId = x.BranchId,
                    SubjectId = x.SubjectId,
                    Semester = x.Semester,
                    IsElective = x.IsElective
                }).ToListAsync();
        }

        public async Task<CourseSubjectDto> GetByIdAsync(int id)
        {
            var entity = await _context.CourseSubjects.FindAsync(id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("CourseSubject not found");

            return new CourseSubjectDto
            {
                Id = entity.Id,
                CourseId = entity.CourseId,
                BranchId = entity.BranchId,
                SubjectId = entity.SubjectId,
                Semester = entity.Semester,
                IsElective = entity.IsElective
            };
        }

        public async Task<CourseSubjectDto> CreateAsync(CourseSubjectCreateDto dto, string user)
        {
            await ValidateFK(dto.CourseId, dto.BranchId, dto.SubjectId);

            // Optional: prevent duplicates
            bool exists = await _context.CourseSubjects.AnyAsync(x =>
                x.CourseId == dto.CourseId &&
                x.BranchId == dto.BranchId &&
                x.SubjectId == dto.SubjectId &&
                x.Semester == dto.Semester &&
                !x.IsDeleted);

            if (exists)
                throw new Exception("Mapping already exists");

            var entity = new CourseSubject
            {
                CourseId = dto.CourseId,
                BranchId = dto.BranchId,
                SubjectId = dto.SubjectId,
                Semester = dto.Semester,
                IsElective = dto.IsElective,
                CreatedBy = user
            };

            _context.CourseSubjects.Add(entity);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        public async Task<bool> UpdateAsync(CourseSubjectUpdateDto dto, string user)
        {
            var entity = await _context.CourseSubjects.FindAsync(dto.Id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("CourseSubject not found");

            await ValidateFK(dto.CourseId, dto.BranchId, dto.SubjectId);

            entity.CourseId = dto.CourseId;
            entity.BranchId = dto.BranchId;
            entity.SubjectId = dto.SubjectId;
            entity.Semester = dto.Semester;
            entity.IsElective = dto.IsElective;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var entity = await _context.CourseSubjects.FindAsync(id);

            if (entity == null)
                throw new NotFoundException("CourseSubject not found");

            entity.IsDeleted = true;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateFK(int courseId, int branchId, int subjectId)
        {
            if (!await _context.Courses.AnyAsync(x => x.CourseId == courseId && !x.IsDeleted))
                throw new Exception("Invalid CourseId");

            if (!await _context.Branches.AnyAsync(x => x.BranchId == branchId && !x.IsDeleted))
                throw new Exception("Invalid BranchId");

            if (!await _context.Subjects.AnyAsync(x => x.SubjectId == subjectId && !x.IsDeleted))
                throw new Exception("Invalid SubjectId");
        }
    }
}
