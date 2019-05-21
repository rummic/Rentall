namespace Rentall.Commons.ErrorMessages
{
    public static class OfferErrors
    {
        public static readonly string NotFoundById = "Oferta o podanym id nie istnieje.";
        public static readonly string AddingError = "Nie udało się dodać oferty.";
        public static readonly string NotFoundOffersByUser = "Użytkownik nie utworzył żadnych ofert.";
        public static readonly string NotFoundByQuery = "Nie znaleziono ofert.";
        public static readonly string NotAllowed = "Nie możesz wykonać tej akcji.";
        public static readonly string TooShortTitle = "Za krótki tytuł.";
        public static readonly string TooShortDescription = "Za krótki opis.";
        public static readonly string EmptyPrice = "Cena nie może być pusta.";
        public static readonly string WrongPriceFormat = "Zły format ceny.";
        public static readonly string TooBigPrice = "Za duża cena.";
        public static readonly string TooSmallArea = "Za mała powierzchnia.";
        public static readonly string TooShortCity = "Za krótka nazwa miasta.";
        public static readonly string TooShortStreet = "Za krótka nazwa ulicy.";
        public static readonly string EmptyZipCode = "Pusty kod pocztowy.";
        public static readonly string WrongZipCodeFormat = "Zły format kodu pocztowego.";
    }
}
