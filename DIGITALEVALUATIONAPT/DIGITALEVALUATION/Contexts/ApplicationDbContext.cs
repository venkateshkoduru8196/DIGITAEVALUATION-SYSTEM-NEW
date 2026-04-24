using DIGITALEVALUATION.Entities;
using DIGITALEVALUATION.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace DIGITALEVALUATION.Contexts;
 public class ApplicationDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
           

}
    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<MenuMaster>()
    //        .HasOne(m => m.ParentMenu)
    //        .WithMany(m => m.Children)
    //        .HasForeignKey(m => m.ParentMenuId)
    //        .OnDelete(DeleteBehavior.Restrict);
    //}
    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<AnswerSheet>()
    //        .HasOne(a => a.Student)
    //        .WithMany(s => s.AnswerSheets)
    //        .HasForeignKey(a => a.StudentId)
    //        .OnDelete(DeleteBehavior.Restrict); // 🔥 Fix
    //}
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<College> Colleges { get; set; }
    public DbSet<Course> Courses { get; set; }

    public DbSet<Branch> Branches { get; set; }
    public DbSet<CourseSubject> CourseSubjects { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Faculty> Faculties { get; set; }
    public DbSet<FacultySubject> FacultySubjects { get; set; }
    public DbSet<Exam> Exams { get; set; }

    
    

    public DbSet<AnswerSheet> AnswerSheets { get; set; }
    public DbSet<Evaluation> Evaluations { get; set; }
    public DbSet<MenuMaster> MenuMasters { get; set; }
    public DbSet<RoleMenuMapping> RoleMenuMappings { get; set; }

}