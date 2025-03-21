using SendGrid.Helpers.Mail;
using SendGrid;
using Microsoft.Extensions.Configuration;
using DotNetEnv;

namespace backend.Services
{
	public class EmailService
	{
		private readonly string _apiKey;
		private readonly string _senderEmail;
		private readonly string _senderName;

		public EmailService(IConfiguration configuration)
		{
			if (configuration == null)
			{
				throw new ArgumentNullException(nameof(configuration), "Configuration is null");
			}
			Env.Load();
			
			var sendGridConfig = configuration.GetSection("SendGrid");
			_apiKey = Env.GetString("ENV_SENDGRID_API_KEY");
			_senderEmail = configuration["SendGrid:SenderEmail"];
			_senderName = configuration["SendGrid:SenderName"];
		}

		public async Task<bool> SendEmailAsync(string recipientEmail, string subject, string message)
		{
			var client = new SendGridClient(_apiKey);
			var from = new EmailAddress(_senderEmail, _senderName);
			var to = new EmailAddress(recipientEmail);
			var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);

			var response = await client.SendEmailAsync(msg);
			return response.StatusCode == System.Net.HttpStatusCode.Accepted;
		}
	}
}
