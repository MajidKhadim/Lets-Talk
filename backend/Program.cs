using backend.ChatHub;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// 🔹 Load JWT settings
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(Env.GetString("ENV_JWT_SECRET_KEY"));

// 🔹 Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultMessengerConnection"));
});

builder.Services.AddScoped<IUserRepository, SQLUserRepository>();
builder.Services.AddSingleton<JwtHelper>();
builder.Services.AddSingleton<EmailService>();
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();

// 🔹 Authentication & JWT Bearer
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtSettings["Issuer"],
		ValidAudience = jwtSettings["Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(key)
	};

	options.Events = new JwtBearerEvents
	{
		OnAuthenticationFailed = context =>
		{
			if (context.Exception is SecurityTokenExpiredException)
			{
				context.Response.Headers.Add("Token-Expired", "true");
			}
			return Task.CompletedTask;
		},
		OnMessageReceived = context =>
		{
			// ✅ Log access token for debugging
			var accessToken = context.Request.Query["access_token"];
			context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>()
				.LogInformation("🔑 SignalR Token Received: {Token}", accessToken);

			// ✅ Allow token from query string for WebSocket connections
			if (!string.IsNullOrEmpty(accessToken))
			{
				context.Token = accessToken;
			}
			return Task.CompletedTask;
		}
	};
});



builder.Services.AddAuthorization(options =>
{
	options.AddPolicy("Bearer", policy =>
	{
		policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
			  .RequireAuthenticatedUser();
	});
});

builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo
	{
		Title = "IdealTrip API",
		Version = "v1",
		Description = "API documentation for the IdealTrip project",
	});

	// Add JWT Authentication to Swagger
	options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer YOUR_TOKEN_HERE\"",
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.Http,
		Scheme = "Bearer"
	});

	options.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			new List<string>()
		}
	});
});
// 🔹 CORS Configuration
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend",
		policy =>
		{
			policy.WithOrigins("http://localhost:3000") // Adjust frontend URL
				  .AllowAnyHeader()
				  .AllowAnyMethod()
				  .AllowCredentials(); // Required for SignalR WebSocket
		});
});

// 🔹 Identity Configuration
builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
{
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequiredLength = 6;
	options.Password.RequireDigit = true;
	options.Password.RequireLowercase = true;
	options.Password.RequireUppercase = true;
	options.User.RequireUniqueEmail = true;
	options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 _@$&";
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

var app = builder.Build();

// ✅ Ensure correct middleware order
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseWebSockets();
app.UseStaticFiles();

// ✅ CORS should be before Authentication
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// ✅ Ensure SignalR requires authentication
app.MapHub<ChatHub>("/chathub")
	.RequireAuthorization(JwtBearerDefaults.AuthenticationScheme)
	.RequireCors("AllowFrontend");

// ✅ Ensure API controllers are mapped
app.MapControllers();

app.Run();
