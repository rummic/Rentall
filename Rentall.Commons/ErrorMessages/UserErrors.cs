namespace Rentall.Commons.ErrorMessages
{
    public static class UserErrors
    {
        public static readonly string NotFoundById = "User with provided id does not exist.";
        public static readonly string LoginTaken = "Provided login is already taken by another user.";
        public static readonly string NotFoundByLogin = "User with provided login does not exist.";
        public static readonly string InvalidPassword = "Provided password is invalid";
        public static readonly string CannotDeleteUser = "Cannot delete user with provided id";
    }
}
