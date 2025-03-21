using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public class UserController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly IHttpContextAccessor _contextAccessor;
		private readonly UserManager<ApplicationUser> _userManager;
        public UserController(ApplicationDbContext context,IHttpContextAccessor contextAccessor,UserManager<ApplicationUser> userManager)
        {
            _context = context;
			_contextAccessor = contextAccessor;
			_userManager = userManager;
        }
        [HttpGet("search")]
		[Authorize] // Ensure only logged-in users can search
		public async Task<IActionResult> SearchUsers([FromQuery] string query)
		{
			if (string.IsNullOrWhiteSpace(query))
				return BadRequest(new { message = "Search query cannot be empty." });

			var users = await _context.Users
				.Where(u => u.Email.Contains(query) || u.UserName.Contains(query))
				.ToListAsync(); // Fetch data first

			var result = users.Select(u => new
			{
				u.Id,
				u.UserName,
				u.Email,
				ProfileImage = u.ProfilePhotoUrl
			}).ToList(); // Now select specific fields

			return Ok(result);
		}
		[HttpGet]
		public async Task<IActionResult> GetUserProfile()
		{
			var userId = _contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return BadRequest(new UserManagerResponse { IsSuccess = false, Messege = "User not found", Errors = new List<string> { "User Not Found" } });
			}
			return Ok(new UserManagerResponse { IsSuccess = true, Messege = "Profile Access Successfully", Data = new { name = user.UserName, email = user.Email, profilePicture = user.ProfilePhotoUrl } });
		}

		[HttpPost]
		public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserModel model)
		{
			var userId = _contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (string.IsNullOrEmpty(userId))
			{
				return BadRequest(new UserManagerResponse { IsSuccess = false, Messege = "User not found", Errors = new List<string> { "User Not Found" } });
			}

			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return BadRequest(new UserManagerResponse { IsSuccess = false, Messege = "User not found", Errors = new List<string> { "User Not Found" } });
			}

			user.Address = model.Address;
			user.PhoneNumber = model.PhoneNumber;
			user.UserName = model.UserName;

			// Process file upload
			if (model.ProfilePicture != null && model.ProfilePicture.Length > 0)
			{
				string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", userId);

				// Create directory if it doesn't exist
				if (!Directory.Exists(uploadsFolder))
				{
					Directory.CreateDirectory(uploadsFolder);
				}

				string uniqueFileName = $"{Guid.NewGuid()}_{model.ProfilePicture.FileName}";
				string filePath = Path.Combine(uploadsFolder, uniqueFileName);

				// Save file to wwwroot/userId folder
				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					await model.ProfilePicture.CopyToAsync(fileStream);
				}

				// Store file path in database (adjust this according to your model)
				user.ProfilePhotoUrl = $"https://localhost:7216/{userId}/{uniqueFileName}";
			}

			var result = await _userManager.UpdateAsync(user);
			if (!result.Succeeded)
			{
				return BadRequest(new UserManagerResponse { IsSuccess = false, Messege = "Update failed", Errors = result.Errors.Select(e => e.Description).ToList() });
			}

			return Ok(new UserManagerResponse { IsSuccess = true, Messege = "Profile updated successfully" });
		}
	}
}
