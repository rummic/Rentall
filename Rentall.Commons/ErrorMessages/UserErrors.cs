namespace Rentall.Commons.ErrorMessages
{
    public static class UserErrors
    {
        public const string NotFoundById = "Użytkownik o podanym id nie istnieje.";
        public const string LoginTaken = "Podany login jest używany przez innego użytkownika.";
        public const string NotFoundByLogin = "Użytkownik o podanym loginie nie istnieje.";
        public const string InvalidPassword = "Podane hasło jest nieprawidłowe.";
        public const string CannotDeleteUser = "Nie można usunąc użytkownika o podanym id.";
        public const string NotAllowed = "Nie możesz wykonać tej akcji.";
        public const string EmptyLogin = "Login nie może być pusty.";
        public const string EmptyEmail = "Email nie może być pusty.";
        public const string EmptyFirstName = "Imie nie może być puste.";
        public const string EmptyLastName = "Nazwisko nie może być puste.";
        public const string EmptyPhoneNumber = "Numer telefonu nie może być pusty.";
        public const string LoginInvalidChars = "Login może składać się z tylko z liter i cyfr";
        public const string EmailInvalid = "Podany adres email jest niepoprawny.";
        public const string NotFoundByMail = "Nie znaleziono użytkownika o podanym adresie email.";
    }
}
