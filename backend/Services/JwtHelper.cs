using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
	public class JwtHelper
	{
		private readonly IConfiguration _configuration;

		public JwtHelper(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public JwtSecurityToken? GenerateToken(string userId, string email)
		{
			Env.Load();
			var secretKey = Env.GetString("ENV_JWT_SECRET_KEY");
			var jwtSettings = _configuration.GetSection("Jwt");
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
			var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
				new Claim(JwtRegisteredClaimNames.Email, email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(ClaimTypes.NameIdentifier,userId)
			};

			var token = new JwtSecurityToken(
				issuer: jwtSettings["Issuer"],
				audience: jwtSettings["Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiresInMinutes"])),
				signingCredentials: credentials
			);

			return token;
		}
	}
}
