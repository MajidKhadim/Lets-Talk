using backend.Helpers;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Repositories
{
	public class SQLUserRepository : IUserRepository
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly JwtHelper _jwtHelper;
		private readonly IConfiguration _config;
		private readonly EmailService _emailService;
		private readonly ILogger<SQLUserRepository> _logger;
        public SQLUserRepository(UserManager<ApplicationUser> userManager,JwtHelper jwtHelper,IConfiguration config,EmailService emailService,ILogger<SQLUserRepository> logger)
        {
            _userManager = userManager;
			_jwtHelper = jwtHelper;
			_config = config;
			_emailService = emailService;
			_logger = logger;
        }
		public async Task<UserManagerResponse> RegisterUserAsync(RegisterModel model)
		{
			try
			{
				var user = new ApplicationUser
				{
					Email = model.Email,
					UserName = model.UserName,
					Address = "",
					ProfilePhotoUrl = ""
				};

				var result = await _userManager.CreateAsync(user, model.Password);

				if (result.Succeeded)
				{
					return new UserManagerResponse
					{
						IsSuccess = true,
						Messege = "User Created Successfully",
					};
				}

				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "User Creation Failed",
					Errors = result.Errors.Select(e => e.Description) // Extract Identity errors
				};
			}
			catch (Exception ex)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "An error occurred while creating the user.",
					Errors = new List<string> { ex.Message }
				};
			}
		}

		public async Task<UserManagerResponse> LoginUserAsync(LoginModel model)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user == null)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "No user associated with this email. Try signing up.",
					Errors = new List<string> { "User not found" }
				};
			}

			var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
			if (!isPasswordValid)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Wrong password!",
					Errors = new List<string> { "Invalid credentials" }
				};
			}

			try
			{
				var token = _jwtHelper.GenerateToken(user.Id.ToString(), model.Email);
				return new UserManagerResponse
				{
					IsSuccess = true,
					Messege = new JwtSecurityTokenHandler().WriteToken(token),
					Data = user.Id.ToString()
				};
			}
			catch (Exception ex)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "An error occurred while generating the token.",
					Errors = new List<string> { ex.Message }
				};
			}
		}

		public async Task<bool> SendEmailVerificationAsync(string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null) return false;
			string token;
			var subject = "";
			string emailContent;
			if (!user.EmailConfirmed)
			{
				token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				var userId = user.Id.ToString();
				var backendUrl = _config["Urls:BackendUrl"];
				// Backend API endpoint for email confirmation
				var callbackUrl = $"{backendUrl}/api/auth/confirm-email?token={Uri.EscapeDataString(token)}&userId={Uri.EscapeDataString(userId)}";
				_logger.LogCritical(callbackUrl);

				emailContent = EmailTemplates.EmailVerificationTemplate(user.UserName, callbackUrl);
				subject = "Confirm Your Email";
			}
			else
			{
				token = await _userManager.GeneratePasswordResetTokenAsync(user);
				// navigate to change password page
				var userId = user.Id.ToString();
				var frontendUrl = _config["Urls:Front_Url"];
				// Construct the callback URL with token and userId as query parameters
				var callbackUrl = $"{frontendUrl}/change-password?token={Uri.EscapeDataString(token)}&userId={Uri.EscapeDataString(userId)}";

				emailContent = EmailTemplates.EmailVerificationTemplate(user.UserName, callbackUrl);
				subject = "Reset Your Password";
			}
			var result = await _emailService.SendEmailAsync(email, subject, emailContent);
			return result;
		}

		public async Task<UserManagerResponse> DeleteUser(string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "User not found.",
					Errors = new List<string> { "No user exists with the provided email." }
				};
			}

			var result = await _userManager.DeleteAsync(user);
			if (result.Succeeded)
			{
				return new UserManagerResponse
				{
					IsSuccess = true,
					Messege = "User deleted successfully."
				};
			}

			return new UserManagerResponse
			{
				IsSuccess = false,
				Messege = "Error deleting user.",
				Errors = result.Errors.Select(e => e.Description).ToList()
			};
		}


		public async Task<UserManagerResponse> ConfirmEmail(string userId, string token)
		{
			var user = await _userManager.FindByIdAsync(userId);
			if (user == null)
			{
				return new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Invalid user.",
					Errors = new List<string> { "No user found with the given ID." }
				};
			}

			if (user.EmailConfirmed)
			{
				return new UserManagerResponse
				{
					IsSuccess = true,
					Messege = "Email already verified."
				};
			}

			var result = await _userManager.ConfirmEmailAsync(user, token);
			if (result.Succeeded)
			{
				var frontendUrl = _config["Urls:FrontUrl"];
				var verificationLink = $"{frontendUrl}/email-verified";

				return new UserManagerResponse
				{
					IsSuccess = true,
					Messege = verificationLink
				};
			}

			return new UserManagerResponse
			{
				IsSuccess = false,
				Messege = "Error confirming email.",
				Errors = result.Errors.Select(e => e.Description).ToList()
			};
		}
	}
}
