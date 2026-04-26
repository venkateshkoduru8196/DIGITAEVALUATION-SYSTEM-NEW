using DIGITALEVALUATION.Contexts;
using DIGITALEVALUATION.Helpers;
using DIGITALEVALUATION.Models;
using DIGITALEVALUATION.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using DIGITALEVALUATION.Exceptions;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// JWT Config
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));

// Identity
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<ICollegeService, CollegeService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<ICourseSubjectService, CourseSubjectService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IFacultyService, FacultyService>();
builder.Services.AddScoped<IFacultySubjectService, FacultySubjectService>();
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<IAnswerSheetService, AnswerSheetService>();
builder.Services.AddScoped<IEvaluationService, EvaluationService>();

// DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = false;
    o.SaveToken = false;

    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
    };

    o.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.HttpContext.Request.Method == "OPTIONS")
            {
                context.NoResult();
            }
            return Task.CompletedTask;
        }
    };
});

// Controllers
builder.Services.AddControllers();

// Swagger + JWT
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "DIGITAL EVALUATION", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter: Bearer YOUR_TOKEN"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// ✅ CORS — includes production domain
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "https://genbasesoftware.com",
                    "http://genbasesoftware.com"
                  )
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// ✅ Seed Roles — wrapped in try-catch so app starts even if DB is unavailable
try
{
    using (var scope = app.Services.CreateScope())
    {
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

        string[] roles = { "Admin", "User" };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = role });
            }
        }
    }
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while seeding roles. App will continue.");
}

// ── 1. Error Handling ────────────────────────────────────
app.UseMiddleware<ExceptionMiddleware>();

// ── 2. Swagger ───────────────────────────────────────────
app.UseSwagger();
app.UseSwaggerUI();

// ── 3. HTTPS ─────────────────────────────────────────────
app.UseHttpsRedirection();

// ── 4. Static Files + React ──────────────────────────────
app.UseDefaultFiles();
app.UseStaticFiles();

// ── 5. Routing ───────────────────────────────────────────
app.UseRouting();

// ── 6. CORS ──────────────────────────────────────────────
app.UseCors("AllowFrontend");

// ── 7. Auth ──────────────────────────────────────────────
app.UseAuthentication();
app.UseAuthorization();

// ── 8. Controllers ───────────────────────────────────────
app.MapControllers();

// ── 9. React Router fallback ─────────────────────────────
app.MapFallbackToFile("index.html");

app.Run();
