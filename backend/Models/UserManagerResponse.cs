namespace backend.Models
{
	public class UserManagerResponse
	{
        public bool IsSuccess { get; set; }
		public string Messege {  get; set; }
		public IEnumerable<string> Errors {  get; set; }
		public Object Data { get; set; }
    }
}
