namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudentDto>> GetAllAsync()
        {
            return await _context.Students
                .Where(x => !x.IsDeleted)
                .Select(x => new StudentDto
                {
                    StudentId = x.StudentId,
                    RollNumber = x.RollNumber,
                    RegistrationNumber = x.RegistrationNumber,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    CourseId = x.CourseId,
                    BranchId = x.BranchId,
                    CurrentSemester = x.CurrentSemester,
                    Status = x.Status
                }).ToListAsync();
        }

        public async Task<StudentDto> GetByIdAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null || student.IsDeleted)
                throw new NotFoundException("Student not found");

            return new StudentDto
            {
                StudentId = student.StudentId,
                RollNumber = student.RollNumber,
                RegistrationNumber = student.RegistrationNumber,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                CourseId = student.CourseId,
                BranchId = student.BranchId,
                CurrentSemester = student.CurrentSemester,
                Status = student.Status
            };
        }

        public async Task<StudentDto> CreateAsync(StudentCreateDto dto, string user)
        {
            // Unique validation
            if (await _context.Students.AnyAsync(x => x.RollNumber == dto.RollNumber))
                throw new Exception("RollNumber already exists");

            await ValidateFK(dto.CourseId, dto.BranchId);

            var student = new Student
            {
                RollNumber = dto.RollNumber,
                RegistrationNumber = dto.RegistrationNumber,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Gender = dto.Gender,
                DOB = dto.DOB,
                BloodGroup = dto.BloodGroup,
                Phone = dto.Phone,
                Email = dto.Email,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,
                CourseId = dto.CourseId,
                BranchId = dto.BranchId,
                AdmissionYear = dto.AdmissionYear,
                CurrentSemester = dto.CurrentSemester,
                ParentName = dto.ParentName,
                ParentPhone = dto.ParentPhone,
                Status = dto.Status,
                CreatedBy = user
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(student.StudentId);
        }

        public async Task<bool> UpdateAsync(StudentUpdateDto dto, string user)
        {
            var student = await _context.Students.FindAsync(dto.StudentId);

            if (student == null || student.IsDeleted)
                throw new NotFoundException("Student not found");

            await ValidateFK(dto.CourseId, dto.BranchId);

            student.RollNumber = dto.RollNumber;
            student.RegistrationNumber = dto.RegistrationNumber;
            student.FirstName = dto.FirstName;
            student.LastName = dto.LastName;
            student.Email = dto.Email;
            student.CourseId = dto.CourseId;
            student.BranchId = dto.BranchId;
            student.CurrentSemester = dto.CurrentSemester;
            student.Status = dto.Status;
            student.UpdatedBy = user;
            student.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                throw new NotFoundException("Student not found");

            student.IsDeleted = true;
            student.UpdatedBy = user;
            student.UpdatedDate = DateTime.Now;

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
