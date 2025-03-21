using backend.Models;

namespace backend.Repositories.Interfaces
{
	public interface IUserRepository
	{
		Task<UserManagerResponse> RegisterUserAsync(RegisterModel model);
		Task<UserManagerResponse> LoginUserAsync(LoginModel model);
		Task<bool> SendEmailVerificationAsync(string email);
		Task<UserManagerResponse> DeleteUser(string email);
		Task<UserManagerResponse> ConfirmEmail(string userId, string token);
	}
}
