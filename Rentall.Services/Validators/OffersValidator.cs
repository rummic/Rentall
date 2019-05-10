namespace Rentall.Services.Validators
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;

    public static class OffersValidator
    {
        public static ResponseDto<GetOfferDto> ValidateGetOfferById(Offer offer)
        {
            var response = new ResponseDto<GetOfferDto>();
            if (offer != null)
            {
                return response;
            }

            response.AddError(OfferErrors.NotFoundById);
            return response;

        }

        public static ResponseDto<int> ValidateAddOffer(User user, Category category, OfferType offerType)
        {
            var response = new ResponseDto<int>();

            if (user == null)
                response.AddError(UserErrors.NotFoundByLogin);

            if (category == null)
                response.AddError(CategoryErrors.NotFoundById);

            if (offerType == null)
                response.AddError(OfferTypeErrors.NotFoundById);

            return response;
        }

        public static ResponseDto<bool> ValidateChangeOfferActivity(Offer offer)
        {
            var response = new ResponseDto<bool>();
            if (offer == null)
            {
                response.AddError(OfferErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteOffer(Offer offer, ClaimsPrincipal userIdentity)
        {
            var response = new ResponseDto<bool>();
            if (offer == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }

            if (userIdentity.Identity.Name != offer.User.Login)
                response.AddError(OfferErrors.CannotDeleteOffer);

            return response;
        }

        public static ResponseDto<List<GetOfferDto>> ValidateGetOffersByUser(User user, IEnumerable<Offer> offers)
        {
            var response = new ResponseDto<List<GetOfferDto>>();
            if (user == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            if (!offers.Any())
            {
                response.AddError(OfferErrors.NotFoundOffersByUser);
            }

            return response;
        }

        public static ResponseDto<int> ValidateUpdateOffer(Offer offer, User user, Category category, OfferType offerType)
        {
            var response = new ResponseDto<int>();
            if (offer == null)
            {
                response.AddError(OfferErrors.NotFoundById);
                return response;
            }
            if (user == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            if (user.Login != offer.User.Login)
            {
                response.AddError(UserErrors.NotAllowed);
                return response;
            }
            if (category == null)
            {
                response.AddError(CategoryErrors.NotFoundById);
                return response;
            }
            if (offerType == null)
            {
                response.AddError(OfferTypeErrors.NotFoundById);
            }

            return response;
        }

    }
}
