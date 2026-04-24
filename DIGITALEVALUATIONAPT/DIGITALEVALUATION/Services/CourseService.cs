namespace DIGITALEVALUATION.Services
{
    using DIGITALEVALUATION.DTOs;
    using DIGITALEVALUATION.Entities;
    using DIGITALEVALUATION.Exceptions;
    using DIGITALEVALUATION.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseDto>> GetAllAsync()
        {
            return await _context.Courses
                .Where(x => !x.IsDeleted)
                .Select(x => new CourseDto
                {
                    CourseId = x.CourseId,
                    CourseCode = x.CourseCode,
                    CourseName = x.CourseName,
                    DurationYears = x.DurationYears,
                    TotalSemesters = x.TotalSemesters
                }).ToListAsync();
        }

        public async Task<CourseDto> GetByIdAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null || course.IsDeleted)
                throw new NotFoundException("Course not found");

            return new CourseDto
            {
                CourseId = course.CourseId,
                CourseCode = course.CourseCode,
                CourseName = course.CourseName,
                DurationYears = course.DurationYears,
                TotalSemesters = course.TotalSemesters
            };
        }

        public async Task<CourseDto> CreateAsync(CourseCreateDto dto, string user)
        {
            // Business validation
            if (dto.TotalSemesters != dto.DurationYears * 2)
                throw new Exception("Total semesters must be DurationYears * 2");

            var course = new Course
            {
                CourseName = dto.CourseName,
                CourseCode = dto.CourseCode,
                DurationYears = dto.DurationYears,
                TotalSemesters = dto.TotalSemesters,
                CreatedBy = user
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(course.CourseId);
        }

        public async Task<bool> UpdateAsync(CourseUpdateDto dto, string user)
        {
            var course = await _context.Courses.FindAsync(dto.CourseId);

            if (course == null || course.IsDeleted)
                throw new NotFoundException("Course not found");

            if (dto.TotalSemesters != dto.DurationYears * 2)
                throw new Exception("Total semesters must be DurationYears * 2");

            course.CourseName = dto.CourseName;
            course.CourseCode = dto.CourseCode;
            course.DurationYears = dto.DurationYears;
            course.TotalSemesters = dto.TotalSemesters;
            course.UpdatedBy = user;
            course.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string user)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                throw new NotFoundException("Course not found");

            course.IsDeleted = true;
            course.UpdatedBy = user;
            course.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
