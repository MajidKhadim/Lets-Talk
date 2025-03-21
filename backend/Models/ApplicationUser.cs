using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
	public class ApplicationUser : IdentityUser<Guid>
	{
        public string Address { get; set; }
		public string ProfilePhotoUrl {  get; set; }
    }
}
