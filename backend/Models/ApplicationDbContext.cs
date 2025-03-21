using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace backend.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser,IdentityRole<Guid>,Guid>
	{

        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageStatus> MessageStatuses { get; set; }
       
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

            
        }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder); // Important for Identity

			// Fix for Chat foreign keys
			modelBuilder.Entity<Chat>()
				.HasOne(c => c.User1)
				.WithMany()
				.HasForeignKey(c => c.User1Id)
				.OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<Chat>()
				.HasOne(c => c.User2)
				.WithMany()
				.HasForeignKey(c => c.User2Id)
				.OnDelete(DeleteBehavior.NoAction);

			// Fix for Message foreign key
			modelBuilder.Entity<Message>()
				.HasOne(m => m.Chat)
				.WithMany(c => c.Messages)
				.HasForeignKey(m => m.ChatId)
				.OnDelete(DeleteBehavior.Cascade); // Allow deleting messages when chat is deleted

			// Fix for MessageStatus foreign key
			modelBuilder.Entity<MessageStatus>()
				.HasOne(ms => ms.Message)
				.WithMany()
				.HasForeignKey(ms => ms.MessageId)
				.OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete

			modelBuilder.Entity<MessageStatus>()
				.HasOne(ms => ms.Receiver)
				.WithMany()
				.HasForeignKey(ms => ms.ReceiverId)
				.OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete
		}



	}
}
