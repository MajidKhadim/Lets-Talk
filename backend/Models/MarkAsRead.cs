namespace backend.Models
{
	public class MarkAsReadDto
	{
		public Guid ChatId { get; set; }
		public Guid UserId { get; set; }
	}
}
