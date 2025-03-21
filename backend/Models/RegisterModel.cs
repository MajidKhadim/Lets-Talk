﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class RegisterModel
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password {  get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
