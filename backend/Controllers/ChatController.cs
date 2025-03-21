using backend.ChatHub;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.ChatHub;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ChatController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IWebHostEnvironment _environment;
		private readonly IHubContext<backend.ChatHub.ChatHub> _hubContext;

		public ChatController(ApplicationDbContext context, UserManager<ApplicationUser> userManager,IWebHostEnvironment environment,IHubContext<backend.ChatHub.ChatHub> hubContext)
		{
			_context = context;
			_userManager = userManager;
			_environment = environment;
			_hubContext = hubContext;
		}

		[HttpPost("seed-chat")]
		public async Task<IActionResult> SeedChat()
		{
			// User IDs
			Guid user1Id = Guid.Parse("ECBBB889-4084-4429-B231-08DD5E26E3A7");
			Guid user2Id = Guid.Parse("F6B9DE89-190C-4ABC-36CC-08DD5E1C1DD8");

			// Check if chat already exists
			var existingChat = await _context.Chats.FirstOrDefaultAsync(c =>
				(c.User1Id == user1Id && c.User2Id == user2Id) ||
				(c.User1Id == user2Id && c.User2Id == user1Id));

			if (existingChat == null)
			{
				// Create a new chat
				var chat = new Chat
				{
					Id = Guid.NewGuid(),
					User1Id = user1Id,
					User2Id = user2Id,
					CreatedAt = DateTime.UtcNow
				};

				_context.Chats.Add(chat);
				await _context.SaveChangesAsync(); // Save chat first

				// Now insert multiple messages
				var messages = new List<Message>
		{
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user1Id,
				Content = "Hey! How are you?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user2Id,
				Content = "I'm good, thanks! What about you?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(1)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user1Id,
				Content = "Just chilling. Wanna catch up later?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(2)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user2Id,
				Content = "Sure! What time?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(3)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user1Id,
				Content = "How about 7 PM?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(4)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user2Id,
				Content = "Sounds great! See you then! 😊",
				AttachmentUrl = "",
				MessageType = MessageType.Text,
				SentAt = DateTime.Now.AddMinutes(5)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = chat.Id,
				SenderId = user1Id,
				Content = "See you! 👍",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(6)
			}
		};

				_context.Messages.AddRange(messages);
				await _context.SaveChangesAsync();

				return Ok(new { message = "Chat and messages seeded successfully!", chatId = chat.Id });
			}
			else
			{
				// If chat exists, add new messages
				var moreMessages = new List<Message>
		{
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = existingChat.Id,
				SenderId = user1Id,
				Content = "Hey, did you check the new feature?",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(7)
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = existingChat.Id,
				SenderId = user2Id,
				Content = "Not yet! What is it about?",
				MessageType = MessageType.Text,
				SentAt = DateTime.Now.AddMinutes(8),
				AttachmentUrl = "",
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = existingChat.Id,
				SenderId = user1Id,
				Content = "It's a new dark mode for the app!",
				MessageType = MessageType.Text,
				SentAt = DateTime.Now.AddMinutes(9),
				AttachmentUrl = "",
			},
			new Message
			{
				Id = Guid.NewGuid(),
				ChatId = existingChat.Id,
				SenderId = user2Id,
				Content = "Oh nice! I love dark mode 😍",
				MessageType = MessageType.Text,
				AttachmentUrl = "",
				SentAt = DateTime.Now.AddMinutes(10)
			}
		};

				_context.Messages.AddRange(moreMessages);
				await _context.SaveChangesAsync();

				return Ok(new { message = "Added more messages to existing chat!", chatId = existingChat.Id });
			}
		}

		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[HttpPost("start")]
		public async Task<IActionResult> StartChat([FromBody] StartChatDto model)
		{
			var user1Id = GetUserId(); // Extract User1Id from JWT
			var user2Id = model.User2Id;

			if (user1Id == Guid.Empty)
				return Unauthorized("Invalid user.");

			if (user1Id == user2Id)
				return BadRequest(new { message = "You cannot start a chat with yourself." });

			var user2 = await _userManager.FindByIdAsync(user2Id.ToString());
			if (user2 == null)
				return NotFound(new { message = "User not found." });

			// Check if chat already exists
			var existingChat = await _context.Chats
				.FirstOrDefaultAsync(c =>
					(c.User1Id == user1Id && c.User2Id == user2Id) ||
					(c.User1Id == user2Id && c.User2Id == user1Id));

			if (existingChat != null)
				return Ok(new { chatId = existingChat.Id, message = "Chat already exists." });

			// Create new chat
			var chat = new Chat { User1Id = user1Id, User2Id = user2Id };
			_context.Chats.Add(chat);

			try
			{
				await _context.SaveChangesAsync();
				return Ok(new { chatId = chat.Id, message = "Chat started successfully." });
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "An error occurred while creating the chat.", error = ex.Message });
			}
		}

		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[HttpPost("send")]
		public async Task<IActionResult> SendMessage([FromForm] SendMessageDto model)
		{
			var userId = GetUserId();
			if (userId == Guid.Empty)
				return Unauthorized("Invalid user.");

			var chat = await _context.Chats.FindAsync(model.ChatId);
			if (chat == null)
				return NotFound(new { message = "Chat not found." });

			var message = new Message
			{
				Id = Guid.NewGuid(),
				ChatId = model.ChatId,
				SenderId = userId,
				Content = model.Content,
				AttachmentUrl = "",
				SentAt = DateTime.Now
			};

			if (model.File != null)
			{
				// Determine file type
				string fileExtension = Path.GetExtension(model.File.FileName).ToLower();
				MessageType messageType;

				if (new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" }.Contains(fileExtension))
					messageType = MessageType.Image;
				else if (new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv" }.Contains(fileExtension))
					messageType = MessageType.Video;
				else
					messageType = MessageType.Document;

				message.MessageType = messageType;

				// Define upload path: uploads/{userId}/{messageType}/
				var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", userId.ToString(), messageType.ToString().ToLower());
				if (!Directory.Exists(uploadsFolder))
				{
					Directory.CreateDirectory(uploadsFolder);
				}

				var fileName = $"{Guid.NewGuid()}{fileExtension}";
				var filePath = Path.Combine(uploadsFolder, fileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await model.File.CopyToAsync(stream);
				}

				message.AttachmentUrl = $"/uploads/{userId}/{messageType.ToString().ToLower()}/{fileName}";
			}
			else
			{
				message.MessageType = MessageType.Text; // Default to text if no file is uploaded
			}

			_context.Messages.Add(message);
			await _context.SaveChangesAsync();

			await _hubContext.Clients.GroupExcept(model.ChatId.ToString(), userId.ToString())
	.SendAsync("ReceiveMessage", new
	{
		id = message.Id,
		chatId = model.ChatId,
		sender = userId,
		content = message.Content,
		contentType = message.MessageType.ToString(),
		url = message.AttachmentUrl,
		sentAt = message.SentAt
	});
			var receiverId = chat.User1Id == userId ? chat.User2Id : chat.User1Id;

			// Notify the recipient
			await _hubContext.Clients.User(receiverId.ToString())
				.SendAsync("ReceiveNotification", new
				{
					chatId = model.ChatId,
					sender = userId,
					messagePreview = message.Content,
					sentAt = message.SentAt
				});

			Console.WriteLine("✅ Notification Sent for Chat: " + model.ChatId);

			return Ok(new
			{
				id = message.Id,
				chatId = message.ChatId,
				sender = "you",
				content = message.Content,
				fileUrl = message.AttachmentUrl,
				messageType = message.MessageType.ToString(),
				sentAt = message.SentAt
			});
		}




		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[HttpPost("mark-as-read")]
		public async Task<IActionResult> MarkMessagesAsRead([FromBody] MarkAsReadDto model)
		{
			var userId = GetUserId(); // Extract from JWT

			var messages = await _context.Messages
				.Where(m => m.ChatId == model.ChatId && m.SenderId != userId && !m.IsRead)
				.ToListAsync();

			foreach (var message in messages)
			{
				message.IsRead = true;
			}

			await _context.SaveChangesAsync();
			return Ok("Messages marked as read.");
		}

		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[HttpGet("user-chats")]
		//public async Task<IActionResult> GetUserChatsFormatted()
		//{
		//	var userId = GetUserId();

		//	var chats = await _context.Chats
		//		.Where(c => c.User1Id == userId || c.User2Id == userId)
		//		.Include(c => c.User1)
		//		.Include(c => c.User2)
		//		.ToListAsync();

		//	var chatList = new List<object>();

		//	foreach (var chat in chats)
		//	{
		//		var otherUser = chat.User1Id == userId ? chat.User2 : chat.User1;
		//		var messages = await _context.Messages
		//			.Where(m => m.ChatId == chat.Id)
		//			.OrderBy(m => m.SentAt)
		//			.ToListAsync();

		//		var unreadCount = messages.Count(m => m.SenderId != userId && !m.IsRead);
		//		var profileImageUrl = string.IsNullOrEmpty(otherUser.ProfilePhotoUrl)
		//	? "/user.png" // Fallback to default image if empty or null
		//	: otherUser.ProfilePhotoUrl;
		//		var formattedChat = new
		//		{
		//			id = chat.Id,
		//			name = otherUser.UserName,
		//			lastMessage = messages.LastOrDefault()?.Content ?? "",
		//			unread = unreadCount,
		//			image = profileImageUrl , // Placeholder image
		//		};

		//		chatList.Add(formattedChat);
		//	}

		//	return Ok(chatList);
		//}

		public async Task<IActionResult> GetUserChatsFormatted()
		{
			var userId = GetUserId();

			var chats = await _context.Chats
				.Where(c => c.User1Id == userId || c.User2Id == userId)
				.Include(c => c.User1)
				.Include(c => c.User2)
				.ToListAsync();

			var chatList = new List<object>();

			foreach (var chat in chats)
			{
				var otherUser = chat.User1Id == userId ? chat.User2 : chat.User1;
				var messages = await _context.Messages
					.Where(m => m.ChatId == chat.Id)
					.OrderBy(m => m.SentAt)
					.ToListAsync();

				var unreadCount = messages.Count(m => m.SenderId != userId && !m.IsRead);

				// Get the last message content or an empty string if no messages exist
				var lastMessage = messages.LastOrDefault()?.Content ?? string.Empty;

				// Determine who sent the last message (true if sent by the user)
				var isLastMessageSentByMe = messages.LastOrDefault()?.SenderId == userId;

				// Get the profile image or fallback to default
				var profileImageUrl = string.IsNullOrEmpty(otherUser.ProfilePhotoUrl)
					? "/user.png" // Fallback to default image if empty or null
					: otherUser.ProfilePhotoUrl;

				// Prepare formatted chat data
				var formattedChat = new
				{
					id = chat.Id,
					name = otherUser.UserName,
					lastMessage = lastMessage,
					unread = unreadCount,
					image = profileImageUrl, // Placeholder image
					isLastMessageSentByMe = isLastMessageSentByMe, // Whether the last message was sent by the user
				};

				chatList.Add(formattedChat);
			}

			return Ok(chatList);
		}

		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		[HttpGet("{chatId}/messages")]
		public async Task<IActionResult> GetChatMessages(Guid chatId)
		{
			var userId = GetUserId();

			var chat = await _context.Chats
				.Where(c => c.Id == chatId && (c.User1Id == userId || c.User2Id == userId))
				.Include(c => c.User1)
				.Include(c => c.User2)
				.FirstOrDefaultAsync();

			if (chat == null)
			{
				return NotFound(new { message = "Chat not found or unauthorized." });
			}

			var messages = await _context.Messages
				.Where(m => m.ChatId == chatId)
				.OrderBy(m => m.SentAt)
				.ToListAsync();

			// Mark unread messages as read
			var unreadMessages = messages.Where(m => m.SenderId != userId && !m.IsRead).ToList();
			foreach (var message in unreadMessages)
			{
				message.IsRead = true;
			}
			await _context.SaveChangesAsync();

			var formattedMessages = messages.Select(m => new
			{
				id = m.Id,
				sender = m.SenderId == userId ? "you" : m.Sender.UserName, // Replace senderId with "you" if it's the authenticated user
				content = m.Content,
				contentType=m.MessageType,
				url = m.AttachmentUrl,
				sentAt = m.SentAt,
				isRead = m.IsRead,
			});

			var otherUser = chat.User1Id == userId ? chat.User2 : chat.User1;

			var response = new
			{
				chatId = chat.Id,
				name = otherUser.UserName,
				image = "/travel.png",
				messages = formattedMessages
			};

			return Ok(response);
		}


		private Guid GetUserId()
		{
			return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
		}



	}
}
