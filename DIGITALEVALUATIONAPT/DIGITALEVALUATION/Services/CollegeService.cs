using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Entities;
using DIGITALEVALUATION.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
namespace DIGITALEVALUATION.Services
{
   

    public class CollegeService : ICollegeService
    {
        private readonly ApplicationDbContext _context;

        public CollegeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CollegeDto>> GetAllAsync()
        {
            return await _context.Colleges
                .Select(c => new CollegeDto
                {
                    CollegeId = c.CollegeId,
                    CollegeCode = c.CollegeCode,
                    CollegeName = c.CollegeName,
                    City = c.City,
                    State = c.State,
                    Country = c.Country,
                    IsActive = c.IsActive
                })
                .ToListAsync();
        }

        public async Task<CollegeDto?> GetByIdAsync(int id)
        {
            return await _context.Colleges
                .Where(c => c.CollegeId == id)
                .Select(c => new CollegeDto
                {
                    CollegeId = c.CollegeId,
                    CollegeCode = c.CollegeCode,
                    CollegeName = c.CollegeName,
                    City = c.City,
                    State = c.State,
                    Country = c.Country,
                    IsActive = c.IsActive
                })
                .FirstOrDefaultAsync();
        }

        public async Task<CollegeDto> CreateAsync(CreateCollegeDto dto, string userId)
        {
            var entity = new College
            {
                CollegeCode = dto.CollegeCode,
                CollegeName = dto.CollegeName,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Country = dto.Country,
                Pincode = dto.Pincode,
                Phone = dto.Phone,
                Email = dto.Email,
                Website = dto.Website,
                CreatedBy = userId,
                CreatedDate = DateTime.Now
            };

            _context.Colleges.Add(entity);
            await _context.SaveChangesAsync();

            return new CollegeDto
            {
                CollegeId = entity.CollegeId,
                CollegeCode = entity.CollegeCode,
                CollegeName = entity.CollegeName,
                City = entity.City,
                State = entity.State,
                Country = entity.Country,
                IsActive = entity.IsActive
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdateCollegeDto dto, string userId)
        {
            var entity = await _context.Colleges.FindAsync(id);
            if (entity == null) return false;

            entity.CollegeCode = dto.CollegeCode;
            entity.CollegeName = dto.CollegeName;
            entity.Address = dto.Address;
            entity.City = dto.City;
            entity.State = dto.State;
            entity.Country = dto.Country;
            entity.Pincode = dto.Pincode;
            entity.Phone = dto.Phone;
            entity.Email = dto.Email;
            entity.Website = dto.Website;
            entity.IsActive = dto.IsActive;
            entity.UpdatedBy = userId;
            entity.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var entity = await _context.Colleges.FindAsync(id);
            if (entity == null) return false;

            // Soft delete
            entity.IsDeleted = true;
            entity.UpdatedBy = userId;
            entity.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
