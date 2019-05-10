namespace Rentall.Commons.ErrorMessages
{
    public static class PhotoErrors
    {
        public static readonly string WrongExtension = "Plik musi być \".jpeg\" lub \".png\".";
        public static readonly string EmptyFile = "Plik nie może być pusty.";
        public static readonly string CannotSave = "Plik nie mógł zostać zapisany.";
        public static readonly string InfoSaveFailed = "Informacje o pliku nie mogły być zapisane.";
        public static readonly string NotFoundByPath = "Zdjęcie o podanej ścieżce nie istnieje.";
    }
}
