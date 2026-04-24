namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class BranchService : IBranchService
    {
        private readonly ApplicationDbContext _context;

        public BranchService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BranchDto>> GetAllAsync()
        {
            return await _context.Branches
                .Where(x => !x.IsDeleted)
                .Select(x => new BranchDto
                {
                    BranchId = x.BranchId,
                    CollegeId = x.CollegeId,
                    BranchCode = x.BranchCode,
                    BranchName = x.BranchName,
                    HODFacultyId = x.HODFacultyId
                }).ToListAsync();
        }

        public async Task<BranchDto> GetByIdAsync(int id)
        {
            var branch = await _context.Branches.FindAsync(id);

            if (branch == null || branch.IsDeleted)
                throw new NotFoundException("Branch not found");

            return new BranchDto
            {
                BranchId = branch.BranchId,
                CollegeId = branch.CollegeId,
                BranchCode = branch.BranchCode,
                BranchName = branch.BranchName,
                HODFacultyId = branch.HODFacultyId
            };
        }

        public async Task<BranchDto> CreateAsync(BranchCreateDto dto, string user)
        {
            // FK Validation
            var collegeExists = await _context.Colleges
                .AnyAsync(x => x.CollegeId == dto.CollegeId && !x.IsDeleted);

            if (!collegeExists)
                throw new Exception("Invalid CollegeId");

            var branch = new Branch
            {
                CollegeId = dto.CollegeId,
                BranchName = dto.BranchName,
                BranchCode = dto.BranchCode,
                HODFacultyId = dto.HODFacultyId,
                CreatedBy = user
            };

            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(branch.BranchId);
        }

        public async Task<bool> UpdateAsync(BranchUpdateDto dto, string user)
        {
            var branch = await _context.Branches.FindAsync(dto.BranchId);

            if (branch == null || branch.IsDeleted)
                throw new NotFoundException("Branch not found");

            var collegeExists = await _context.Colleges
                .AnyAsync(x => x.CollegeId == dto.CollegeId && !x.IsDeleted);

            if (!collegeExists)
                throw new Exception("Invalid CollegeId");

            branch.CollegeId = dto.CollegeId;
            branch.BranchName = dto.BranchName;
            branch.BranchCode = dto.BranchCode;
            branch.HODFacultyId = dto.HODFacultyId;
            branch.UpdatedBy = user;
            branch.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var branch = await _context.Branches.FindAsync(id);

            if (branch == null)
                throw new NotFoundException("Branch not found");

            branch.IsDeleted = true;
            branch.UpdatedBy = user;
            branch.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
