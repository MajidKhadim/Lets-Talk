using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class MessageStatus
	{
		public Guid Id { get; set; }
		public Guid MessageId { get; set; }  // Message being tracked
		public Guid ReceiverId { get; set; } // The recipient user
		public bool IsRead { get; set; } = false;
		public DateTime? ReadAt { get; set; }

		[ForeignKey("MessageId")]
		public Message Message { get; set; }

		[ForeignKey("ReceiverId")]
		public ApplicationUser Receiver { get; set; }
	}

}
