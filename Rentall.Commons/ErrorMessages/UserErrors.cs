using System;
using System.Collections.Generic;
using System.Text;

namespace Rentall.Commons.ErrorMessages
{
    public static class UserErrors
    {
        public static readonly string NotFoundById = "User with provided id does not exist.";
        public static readonly string LoginTaken = "Provided login is already taken by another user.";
        public static readonly string NotFoundByLogin = "User with provided login does not exist.";
    }
}
