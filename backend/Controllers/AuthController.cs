using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
        private readonly IUserRepository _userRepository;
		private readonly ILogger<AuthController> _logger;
        public AuthController(IUserRepository userRepository,ILogger<AuthController> logger)
        {
            _userRepository = userRepository;
			_logger = logger;

        }

		[HttpGet("validate-token")]
		[Authorize] // Ensures only authenticated users can access this
		public IActionResult ValidateToken()
		{
			return Ok(new { isValid = true, message = "Token is valid" });
		}
		[HttpPost("login")]
		public async Task<IActionResult> LoginAsync(LoginModel model)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(new UserManagerResponse
					{
						IsSuccess = false,
						Messege = "Some properties are invalid.",
						Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
					});
				}

				var result = await _userRepository.LoginUserAsync(model);
				_logger.LogWarning(result.Messege);
				return result.IsSuccess ? Ok(result) : BadRequest(result);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Internal Server Error.",
					Errors = new List<string> { ex.Message }
				});
			}
		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterAsync(RegisterModel model)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(new UserManagerResponse
					{
						IsSuccess = false,
						Messege = "Some properties are invalid.",
						Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
					});
				}

				var result = await _userRepository.RegisterUserAsync(model);
				if (!result.IsSuccess)
				{
					return BadRequest(result);
				}

				var emailSent = await _userRepository.SendEmailVerificationAsync(model.Email);
				if (emailSent)
				{
					return Ok(new UserManagerResponse
					{
						IsSuccess = true,
						Messege = "Registration successful! Check your email for the verification link."
					});
				}

				// If email verification fails, delete the user and notify the client
				await _userRepository.DeleteUser(model.Email);
				return BadRequest(new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Something went wrong while sending the verification email. Please try again."
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Internal Server Error.",
					Errors = new List<string> { ex.Message }
				});
			}
		}

		[HttpGet("confirm-email")]
		public async Task<IActionResult> ConfirmEmail(string userId, string token)
		{
			if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
			{
				return BadRequest(new UserManagerResponse
				{
					IsSuccess = false,
					Messege = "Invalid email confirmation request."
				});
			}

			var result = await _userRepository.ConfirmEmail(userId, token);
			return result.IsSuccess ? Redirect(result.Messege) : BadRequest(result);
		}
	}
}
