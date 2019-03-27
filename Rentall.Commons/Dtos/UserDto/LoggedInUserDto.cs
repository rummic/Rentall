using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.Commons.Dtos.UserDto
{
    public class LoggedInUserDto
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Token { get; set; }

    }
}
