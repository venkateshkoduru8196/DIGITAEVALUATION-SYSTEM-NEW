namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class FacultyService : IFacultyService
    {
        private readonly ApplicationDbContext _context;

        public FacultyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FacultyDto>> GetAllAsync()
        {
            return await _context.Faculties
                .Where(x => !x.IsDeleted)
                .Select(x => new FacultyDto
                {
                    FacultyId = x.FacultyId,
                    EmployeeCode = x.EmployeeCode,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    Designation = x.Designation,
                    BranchId = x.BranchId,
                    Salary = x.Salary
                }).ToListAsync();
        }

        public async Task<FacultyDto> GetByIdAsync(int id)
        {
            var faculty = await _context.Faculties.FindAsync(id);

            if (faculty == null || faculty.IsDeleted)
                throw new NotFoundException("Faculty not found");

            return new FacultyDto
            {
                FacultyId = faculty.FacultyId,
                EmployeeCode = faculty.EmployeeCode,
                FirstName = faculty.FirstName,
                LastName = faculty.LastName,
                Email = faculty.Email,
                Designation = faculty.Designation,
                BranchId = faculty.BranchId,
                Salary = faculty.Salary
            };
        }

        public async Task<FacultyDto> CreateAsync(FacultyCreateDto dto, string user)
        {
            // Unique validation
            if (await _context.Faculties.AnyAsync(x => x.EmployeeCode == dto.EmployeeCode))
                throw new Exception("EmployeeCode already exists");

            await ValidateBranch(dto.BranchId);

            var faculty = new Faculty
            {
                EmployeeCode = dto.EmployeeCode,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Gender = dto.Gender,
                Phone = dto.Phone,
                Email = dto.Email,
                Qualification = dto.Qualification,
                ExperienceYears = dto.ExperienceYears,
                DateOfJoining = dto.DateOfJoining,
                Designation = dto.Designation,
                BranchId = dto.BranchId,
                Salary = dto.Salary,
                CreatedBy = user
            };

            _context.Faculties.Add(faculty);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(faculty.FacultyId);
        }

        public async Task<bool> UpdateAsync(FacultyUpdateDto dto, string user)
        {
            var faculty = await _context.Faculties.FindAsync(dto.FacultyId);

            if (faculty == null || faculty.IsDeleted)
                throw new NotFoundException("Faculty not found");

            await ValidateBranch(dto.BranchId);

            faculty.EmployeeCode = dto.EmployeeCode;
            faculty.FirstName = dto.FirstName;
            faculty.LastName = dto.LastName;
            faculty.Email = dto.Email;
            faculty.Designation = dto.Designation;
            faculty.BranchId = dto.BranchId;
            faculty.Salary = dto.Salary;
            faculty.UpdatedBy = user;
            faculty.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var faculty = await _context.Faculties.FindAsync(id);

            if (faculty == null)
                throw new NotFoundException("Faculty not found");

            faculty.IsDeleted = true;
            faculty.UpdatedBy = user;
            faculty.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task ValidateBranch(int branchId)
        {
            if (!await _context.Branches.AnyAsync(x => x.BranchId == branchId && !x.IsDeleted))
                throw new Exception("Invalid BranchId");
        }
    }
}
