namespace backend.Models
{
	public class UpdateUserModel
	{
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public IFormFile ProfilePicture { get; set; }
    }
}
