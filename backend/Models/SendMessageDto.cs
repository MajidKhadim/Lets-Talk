using backend.Models.Enums;

namespace backend.Models
{
	public class SendMessageDto
	{
		public Guid ChatId { get; set; }
		public string Content { get; set; }
		public IFormFile? File { get; set; } // Optional file
		public MessageType MessageType { get; set; }
	}

}
