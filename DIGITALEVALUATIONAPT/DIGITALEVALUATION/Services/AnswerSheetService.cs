namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class AnswerSheetService : IAnswerSheetService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public AnswerSheetService(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IEnumerable<AnswerSheetDto>> GetAllAsync()
        {
            return await _context.AnswerSheets
                .Where(x => !x.IsDeleted)
                .Select(x => new AnswerSheetDto
                {
                    AnswerSheetId = x.AnswerSheetId,
                    StudentId = x.StudentId,
                    SubjectId = x.SubjectId,
                    ExamId = x.ExamId,
                    FilePath = x.FilePath,
                    FileType = x.FileType,
                    Status = x.Status
                }).ToListAsync();
        }

        public async Task<AnswerSheetDto> GetByIdAsync(int id)
        {
            var entity = await _context.AnswerSheets.FindAsync(id);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("AnswerSheet not found");

            return new AnswerSheetDto
            {
                AnswerSheetId = entity.AnswerSheetId,
                StudentId = entity.StudentId,
                SubjectId = entity.SubjectId,
                ExamId = entity.ExamId,
                FilePath = entity.FilePath,
                FileType = entity.FileType,
                Status = entity.Status
            };
        }

        public async Task<AnswerSheetDto> UploadAsync(AnswerSheetCreateDto dto, string user)
        {
            await ValidateFK(dto.StudentId, dto.SubjectId, dto.ExamId);

            var file = dto.File;

            if (file.Length == 0)
                throw new Exception("File is empty");

            var allowedTypes = new[] { ".pdf", ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(file.FileName).ToLower();

            if (!allowedTypes.Contains(ext))
                throw new Exception("Invalid file type");

            string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            string fileName = $"{Guid.NewGuid()}{ext}";
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var entity = new AnswerSheet
            {
                StudentId = dto.StudentId,
                SubjectId = dto.SubjectId,
                ExamId = dto.ExamId,
                FilePath = $"/uploads/{fileName}",
                FileType = ext == ".pdf" ? "PDF" : "Image",
                Status = "Uploaded",
                CreatedBy = user
            };

            _context.AnswerSheets.Add(entity);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(entity.AnswerSheetId);
        }

        public async Task<bool> UpdateStatusAsync(AnswerSheetUpdateDto dto, string user)
        {
            var entity = await _context.AnswerSheets.FindAsync(dto.AnswerSheetId);

            if (entity == null || entity.IsDeleted)
                throw new NotFoundException("AnswerSheet not found");

            entity.Status = dto.Status;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var entity = await _context.AnswerSheets.FindAsync(id);

            if (entity == null)
                throw new NotFoundException("AnswerSheet not found");

            entity.IsDeleted = true;
            entity.UpdatedBy = user;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateFK(int studentId, int subjectId, int examId)
        {
            if (!await _context.Students.AnyAsync(x => x.StudentId == studentId && !x.IsDeleted))
                throw new Exception("Invalid StudentId");

            if (!await _context.Subjects.AnyAsync(x => x.SubjectId == subjectId && !x.IsDeleted))
                throw new Exception("Invalid SubjectId");

            if (!await _context.Exams.AnyAsync(x => x.ExamId == examId && !x.IsDeleted))
                throw new Exception("Invalid ExamId");
        }
    }
}
