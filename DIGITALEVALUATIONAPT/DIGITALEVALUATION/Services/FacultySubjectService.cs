namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class FacultySubjectService : IFacultySubjectService
    {
        private readonly ApplicationDbContext _context;

        public FacultySubjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FacultySubjectDto>> GetAllAsync()
        {
            return await _context.FacultySubjects
                .Where(x => !x.IsDeleted)
                .Select(x => new FacultySubjectDto
                {
                    Id = x.Id,
                    FacultyId = x.FacultyId,
                    SubjectId = x.SubjectId,
                    Semester = x.Semester,
                    AcademicYear = x.AcademicYear
                }).ToListAsync();
        }

        public async Task<FacultySubjectDto> GetByIdAsync(int id)
        {
            var entity = await _context.FacultySubjects.FindAsync(id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("FacultySubject not found");

            return new FacultySubjectDto
            {
                Id = entity.Id,
                FacultyId = entity.FacultyId,
                SubjectId = entity.SubjectId,
                Semester = entity.Semester,
                AcademicYear = entity.AcademicYear
            };
        }

        public async Task<FacultySubjectDto> CreateAsync(FacultySubjectCreateDto dto, string user)
        {
            await ValidateFK(dto.FacultyId, dto.SubjectId);

            // Prevent duplicate assignment
            bool exists = await _context.FacultySubjects.AnyAsync(x =>
                x.FacultyId == dto.FacultyId &&
                x.SubjectId == dto.SubjectId &&
                x.Semester == dto.Semester &&
                x.AcademicYear == dto.AcademicYear &&
                !x.IsDeleted);

            if (exists)
                throw new Exception("Faculty already assigned to this subject");

            var entity = new FacultySubject
            {
                FacultyId = dto.FacultyId,
                SubjectId = dto.SubjectId,
                Semester = dto.Semester,
                AcademicYear = dto.AcademicYear,
                CreatedBy = user
            };

            _context.FacultySubjects.Add(entity);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        public async Task<bool> UpdateAsync(FacultySubjectUpdateDto dto, string user)
        {
            var entity = await _context.FacultySubjects.FindAsync(dto.Id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("FacultySubject not found");

            await ValidateFK(dto.FacultyId, dto.SubjectId);

            entity.FacultyId = dto.FacultyId;
            entity.SubjectId = dto.SubjectId;
            entity.Semester = dto.Semester;
            entity.AcademicYear = dto.AcademicYear;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var entity = await _context.FacultySubjects.FindAsync(id);

            if (entity == null)
                throw new NotFoundException("FacultySubject not found");

            entity.IsDeleted = true;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateFK(int facultyId, int subjectId)
        {
            if (!await _context.Faculties.AnyAsync(x => x.FacultyId == facultyId && !x.IsDeleted))
                throw new Exception("Invalid FacultyId");

            if (!await _context.Subjects.AnyAsync(x => x.SubjectId == subjectId && !x.IsDeleted))
                throw new Exception("Invalid SubjectId");
        }
    }
}
