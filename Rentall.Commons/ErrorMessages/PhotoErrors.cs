namespace Rentall.Commons.ErrorMessages
{
    public static class PhotoErrors
    {
        public static readonly string WrongExtension = "File must be a \".jpeg\" or \".png\" photo.";
        public static readonly string EmptyFile = "File cannot be empty.";
        public static readonly string CannotSave = "File could not be saved.";
        public static readonly string InfoSaveFailed = "File information could not be saved.";
        public static readonly string NotFoundByPath = "Photo with provided path does not exist.";
    }
}
