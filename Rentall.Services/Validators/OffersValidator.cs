using System;
using System.Text.RegularExpressions;

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

        public static ResponseDto<int> ValidateAddOffer(User user, Category category, OfferType offerType, Offer offerToDb)
        {
            var response = ValidateOfferForm(category, offerType, offerToDb);
            if (user == null)
                response.AddError(UserErrors.NotFoundByLogin);
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
            {
                response.AddError(OfferErrors.NotAllowed);
            }

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

        public static ResponseDto<int> ValidateUpdateOffer(
            Offer offer,
            User user,
            Category category,
            OfferType offerType,
            Offer offerToDb)
        {
            var response = ValidateOfferForm(category, offerType, offerToDb);
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
            }

            return response;
        }

        private static ResponseDto<int> ValidateOfferForm(Category category, OfferType offerType, Offer offerToDb)
        {
            var response = new ResponseDto<int>();
            var zipCodeRegex = new Regex(@"\d{2}-\d{3}");

            if (category == null) response.AddError(CategoryErrors.NotFoundById);

            if (offerType == null)
                response.AddError(OfferTypeErrors.NotFoundById);
            if (string.IsNullOrWhiteSpace(offerToDb.Title) || offerToDb.Title.Length < 3)
                response.AddError(OfferErrors.TooShortTitle);
            if (string.IsNullOrWhiteSpace(offerToDb.Description) || offerToDb.Description.Length < 3)
                response.AddError(OfferErrors.TooShortDescription);
            if (string.IsNullOrWhiteSpace(offerToDb.Price))
                response.AddError(OfferErrors.EmptyPrice);
            else if (!double.TryParse(offerToDb.Price, out double result))
                response.AddError(OfferErrors.WrongPriceFormat);
            else if (offerToDb.Price.Length > 17)
                response.AddError(OfferErrors.TooBigPrice);
            if (offerToDb.Area < 1)
                response.AddError(OfferErrors.TooSmallArea);
            if (string.IsNullOrWhiteSpace(offerToDb.City) || offerToDb.City.Length < 2)
                response.AddError(OfferErrors.TooShortCity);
            if (string.IsNullOrWhiteSpace(offerToDb.Street) || offerToDb.Street.Length < 3)
                response.AddError(OfferErrors.TooShortStreet);
            if (string.IsNullOrWhiteSpace(offerToDb.ZipCode))
                response.AddError(OfferErrors.EmptyZipCode);
            else if (!zipCodeRegex.IsMatch(offerToDb.ZipCode))
                response.AddError(OfferErrors.WrongZipCodeFormat);

            return response;
        }

    }
}
