using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class Chat
	{
		public Guid Id { get; set; }
		public Guid User1Id { get; set; }  // First user
		public Guid User2Id { get; set; }  // Second user
		public DateTime CreatedAt { get; set; } = DateTime.Now;

		[ForeignKey("User1Id")]
		public ApplicationUser User1 { get; set; }

		[ForeignKey("User2Id")]
		public ApplicationUser User2 { get; set; }

		public ICollection<Message> Messages { get; set; }
	}

}
