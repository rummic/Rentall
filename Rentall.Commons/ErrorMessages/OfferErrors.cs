namespace Rentall.Commons.ErrorMessages
{
    public static class OfferErrors
    {
        public static readonly string NotFoundById = "Offer with provided id does not exist.";
        public static readonly string AddingError = "Adding offer failed.";
        public static readonly string CannotDeleteOffer = "Cannot delete offer with provided id.";
        public static readonly string NotFoundOffersByUser = "User has not created any offers.";
    }
}
