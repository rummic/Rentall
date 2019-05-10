namespace Rentall.Commons.ErrorMessages
{
    public static class UserErrors
    {
        public static readonly string NotFoundById = "Użytkownik o podanym id nie istnieje.";
        public static readonly string LoginTaken = "Podany login jest używany przez innego użytkownika.";
        public static readonly string NotFoundByLogin = "Użytkownik o podanym loginie nie istnieje.";
        public static readonly string InvalidPassword = "Podane hasło jest nieprawidłowe.";
        public static readonly string CannotDeleteUser = "Nie można usunąc użytkownika o podanym id.";
        public static readonly string NotAllowed = "Nie możesz wykonać tej akcji.";
    }
}
