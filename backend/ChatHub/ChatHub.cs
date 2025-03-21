using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace backend.ChatHub
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public class ChatHub : Hub
	{
		private readonly ILogger<ChatHub> _logger;
		private readonly IHttpContextAccessor _contextAccessor;

		public ChatHub(ILogger<ChatHub> logger, IHttpContextAccessor accessor)
		{
			_logger = logger;
			_contextAccessor = accessor;
		}

		//public async Task SendMessageToChat(string chatId, string content, string contentType, string fileUrl)
		//{
		//	try
		//	{
		//		_logger.LogInformation("🚀 SendMessageToChat called. ChatId: {ChatId}, Content: {Content}, ContentType: {ContentType}", chatId, content, contentType);

		//		// 🔍 Log the authentication token (useful for debugging)
		//		var token = _contextAccessor.HttpContext?.Request.Query["access_token"].ToString();

		//		if (!string.IsNullOrEmpty(token))
		//		{
		//			_logger.LogInformation("🔑 Received Token: {Token}", token);
		//		}
		//		else
		//		{
		//			_logger.LogWarning("⚠️ No token found in Authorization header.");
		//		}

		//		// Retrieve claims from the user
		//		var user = Context.User;
		//		if (user == null || !user.Identity.IsAuthenticated)
		//		{
		//			_logger.LogError("❌ Unauthorized request: User is not authenticated.");
		//			throw new HubException("Unauthorized: User is not authenticated.");
		//		}

		//		// Try getting senderId from different possible claim sources
		//		var senderId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value
		//					   ?? user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value
		//					   ?? user.FindFirst("sub")?.Value;

		//		if (string.IsNullOrEmpty(senderId))
		//		{
		//			_logger.LogError("❌ Unauthorized request: senderId not found in claims.");
		//			throw new HubException("Unauthorized: Unable to retrieve sender ID.");
		//		}

		//		_logger.LogInformation("📌 Message sender ID: {SenderId}", senderId);

		//		// Send the message to the chat group
		//		await Clients.Group(chatId).SendAsync("ReceiveMessage", new
		//		{
		//			chatId,
		//			sender = senderId,
		//			content,
		//			contentType,
		//			url = fileUrl,
		//			sentAt = DateTime.Now
		//		});
		//	}
		//	catch (Exception ex)
		//	{
		//		_logger.LogError(ex, "💥 Error in SendMessageToChat");
		//		throw;
		//	}
		//}


		public async Task JoinChat(string chatId)
		{
			_logger.LogInformation("✅ User {UserId} joined chat {ChatId}", Context.ConnectionId, chatId);
			await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
		}

		public async Task LeaveChat(string chatId)
		{
			_logger.LogInformation("❌ User {UserId} left chat {ChatId}", Context.ConnectionId, chatId);
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
		}
		public override async Task OnConnectedAsync()
		{
			var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (!string.IsNullOrEmpty(userId))
			{
				await Groups.AddToGroupAsync(Context.ConnectionId, userId);
			}
			await base.OnConnectedAsync();
		}
	}
}
