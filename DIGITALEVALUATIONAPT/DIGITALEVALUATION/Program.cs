using DIGITALEVALUATION.Contexts;
using DIGITALEVALUATION.Helpers;
using DIGITALEVALUATION.Models;
using DIGITALEVALUATION.Services;
using DIGITALEVALUATION.Exceptions;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.DataProtection;

using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ================= JWT CONFIG =================
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));

// ================= DB =================
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// ================= IDENTITY =================
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// ================= DATA PROTECTION (IMPORTANT) =================
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(
        Path.Combine(builder.Environment.ContentRootPath, "keys")))
    .SetApplicationName("DIGITALEVALUATION");

// ================= SERVICES =================
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

// ================= JWT AUTH =================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = true; // production safe
    o.SaveToken = true;

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

    // Handle preflight (CORS)
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

// ================= CONTROLLERS =================
builder.Services.AddControllers();

// ================= SWAGGER =================
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

// ================= CORS (FIXED) =================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://genbasesoftware.com",
                "http://genbasesoftware.com",
                "https://codajewellery.com",
                "http://codajewellery.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// ================= PIPELINE =================

// Error handling
app.UseMiddleware<ExceptionMiddleware>();

// Swagger (optional for production)
app.UseSwagger();
app.UseSwaggerUI();

// HTTPS
app.UseHttpsRedirection();

// Static files (React)
app.UseDefaultFiles();
app.UseStaticFiles();

// Routing
app.UseRouting();

// CORS (must be before auth)
app.UseCors("AllowFrontend");

// Auth
app.UseAuthentication();
app.UseAuthorization();

// Controllers
app.MapControllers();

// React fallback
app.MapFallbackToFile("index.html");

app.Run();
