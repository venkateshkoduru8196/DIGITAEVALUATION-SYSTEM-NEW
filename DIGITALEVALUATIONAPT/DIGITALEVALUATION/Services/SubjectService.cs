using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Entities;
using DIGITALEVALUATION.Exceptions;
using System;
using DIGITALEVALUATION.Contexts;
using Microsoft.EntityFrameworkCore;
namespace DIGITALEVALUATION.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ApplicationDbContext _context;

        public SubjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SubjectDto>> GetAllAsync()
        {
            return await _context.Subjects
                .Where(x => !x.IsDeleted)
                .Select(x => new SubjectDto
                {
                    SubjectId = x.SubjectId,
                    SubjectCode = x.SubjectCode,
                    SubjectName = x.SubjectName,
                    Credits = x.Credits,
                    MaxMarks = x.MaxMarks,
                    PassingMarks = x.PassingMarks
                }).ToListAsync();
        }

        public async Task<SubjectDto> GetByIdAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null || subject.IsDeleted)
                throw new NotFoundException("Subject not found");

            return new SubjectDto
            {
                SubjectId = subject.SubjectId,
                SubjectCode = subject.SubjectCode,
                SubjectName = subject.SubjectName,
                Credits = subject.Credits,
                MaxMarks = subject.MaxMarks,
                PassingMarks = subject.PassingMarks
            };
        }

        public async Task<SubjectDto> CreateAsync(SubjectCreateDto dto, string user)
        {
            if (dto.PassingMarks > dto.MaxMarks)
                throw new Exception("Passing marks cannot be greater than max marks");

            var subject = new Subject
            {
                SubjectName = dto.SubjectName,
                SubjectCode = dto.SubjectCode,
                Credits = dto.Credits,
                MaxMarks = dto.MaxMarks,
                PassingMarks = dto.PassingMarks,
                CreatedBy = user
            };

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(subject.SubjectId);
        }

        public async Task<bool> UpdateAsync(SubjectUpdateDto dto, string user)
        {
            var subject = await _context.Subjects.FindAsync(dto.SubjectId);

            if (subject == null || subject.IsDeleted)
                throw new NotFoundException("Subject not found");

            subject.SubjectName = dto.SubjectName;
            subject.SubjectCode = dto.SubjectCode;
            subject.Credits = dto.Credits;
            subject.MaxMarks = dto.MaxMarks;
            subject.PassingMarks = dto.PassingMarks;
            subject.UpdatedBy = user;
            subject.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
                throw new NotFoundException("Subject not found");

            subject.IsDeleted = true;
            subject.UpdatedBy = user;
            subject.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
