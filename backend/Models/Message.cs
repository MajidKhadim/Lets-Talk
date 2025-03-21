using backend.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class Message
	{
		public Guid Id { get; set; }
		public Guid ChatId { get; set; }  // Associated chat session
		public Guid SenderId { get; set; } // User who sent the message
		public string Content { get; set; } // Text message (optional)
		public string AttachmentUrl { get; set; } // File URL (if any)
		public MessageType MessageType { get; set; } // Enum for type of message
		public DateTime SentAt { get; set; } = DateTime.Now;
		public bool IsRead { get; set; } = false; // Read status

		[ForeignKey("ChatId")]
		public Chat Chat { get; set; }

		[ForeignKey("SenderId")]
		public ApplicationUser Sender { get; set; }
	}


}
