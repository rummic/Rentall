namespace Rentall.Services.Validators
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;

    using Microsoft.AspNetCore.Http;

    using Rentall.Commons.ErrorMessages;
    using Rentall.DAL.Model;
    using Rentall.Services.Dtos;

    public static class PhotosValidator
    {
        private static readonly List<string> AllowedExtensions = new List<string> { ".jpeg", ".jpg", ".png" };

        public static ResponseDto<string> ValidateAddPhoto(ClaimsPrincipal user, Offer offerFromDb, IFormFile photo)
        {
            var result = new ResponseDto<string>();
            if (photo.Length <= 0)
            {
                result.AddError(PhotoErrors.EmptyFile);
                return result;
            }

            if (AllowedExtensions.All(x => x != Path.GetExtension(photo.FileName)))
            {
                result.AddError(PhotoErrors.WrongExtension);
                return result;
            }

            if (offerFromDb == null)
            {
                result.AddError(OfferErrors.NotFoundById);
                return result;
            }

            if (user.Identity.Name != offerFromDb.User.Login)
            {
                result.AddError(UserErrors.NotAllowed);
            }

            return result;
        }
    }
}
