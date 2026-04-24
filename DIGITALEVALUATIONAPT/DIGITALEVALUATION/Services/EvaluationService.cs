namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class EvaluationService : IEvaluationService
    {
        private readonly ApplicationDbContext _context;

        public EvaluationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EvaluationDto>> GetAllAsync()
        {
            return await _context.Evaluations
                .Where(x => !x.IsDeleted)
                .Select(x => new EvaluationDto
                {
                    EvaluationId = x.EvaluationId,
                    AnswerSheetId = x.AnswerSheetId,
                    FacultyId = x.FacultyId,
                    TotalMarks = x.TotalMarks,
                    Remarks = x.Remarks,
                    EvaluatedDate = x.EvaluatedDate
                }).ToListAsync();
        }

        public async Task<EvaluationDto> GetByIdAsync(int id)
        {
            var entity = await _context.Evaluations.FindAsync(id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("Evaluation not found");

            return new EvaluationDto
            {
                EvaluationId = entity.EvaluationId,
                AnswerSheetId = entity.AnswerSheetId,
                FacultyId = entity.FacultyId,
                TotalMarks = entity.TotalMarks,
                Remarks = entity.Remarks,
                EvaluatedDate = entity.EvaluatedDate
            };
        }

        public async Task<EvaluationDto> CreateAsync(EvaluationCreateDto dto, string user)
        {
            await ValidateFK(dto.AnswerSheetId, dto.FacultyId);

            // Prevent duplicate evaluation
            if (await _context.Evaluations.AnyAsync(x => x.AnswerSheetId == dto.AnswerSheetId && !x.IsDeleted))
                throw new Exception("This answer sheet is already evaluated");

            // Validate marks against subject max marks
            var answerSheet = await _context.AnswerSheets
                .Include(x => x.Subject)
                .FirstOrDefaultAsync(x => x.AnswerSheetId == dto.AnswerSheetId);

            if (answerSheet?.Subject == null)
                throw new Exception("Subject not found for validation");

            if (dto.TotalMarks > answerSheet.Subject.MaxMarks)
                throw new Exception("Marks cannot exceed subject max marks");

            var entity = new Evaluation
            {
                AnswerSheetId = dto.AnswerSheetId,
                FacultyId = dto.FacultyId,
                TotalMarks = dto.TotalMarks,
                Remarks = dto.Remarks,
                EvaluatedDate = DateTime.Now,
                CreatedBy = user
            };

            _context.Evaluations.Add(entity);

            // Update AnswerSheet status
            var sheet = await _context.AnswerSheets.FindAsync(dto.AnswerSheetId);
            if (sheet != null)
            {
                sheet.Status = "Evaluated";
            }

            await _context.SaveChangesAsync();

            return await GetByIdAsync(entity.EvaluationId);
        }

        public async Task<bool> UpdateAsync(EvaluationUpdateDto dto, string user)
        {
            var entity = await _context.Evaluations.FindAsync(dto.EvaluationId);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("Evaluation not found");

            entity.TotalMarks = dto.TotalMarks;
            entity.Remarks = dto.Remarks;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var entity = await _context.Evaluations.FindAsync(id);

            if (entity == null)
                throw new NotFoundException("Evaluation not found");

            entity.IsDeleted = true;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateFK(int answerSheetId, int facultyId)
        {
            if (!await _context.AnswerSheets.AnyAsync(x => x.AnswerSheetId == answerSheetId && !x.IsDeleted))
                throw new Exception("Invalid AnswerSheetId");

            if (!await _context.Faculties.AnyAsync(x => x.FacultyId == facultyId && !x.IsDeleted))
                throw new Exception("Invalid FacultyId");
        }
    }
}
