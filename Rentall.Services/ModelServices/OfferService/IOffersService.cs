using System.Collections.Generic;
using System.Security.Claims;

namespace Rentall.Services.ModelServices.OfferService
{
    using System.Threading.Tasks;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;

    public interface IOffersService
    {
        Task<ResponseDto<GetOfferByIdDto>> GetOfferById(int id);
        Task<ResponseDto<int>> AddOffer(ClaimsPrincipal user, AddOfferDto offer);
        Task<ResponseDto<bool>> ChangeOfferActivity(int id);
        Task<ResponseDto<bool>> DeleteOffer(ClaimsPrincipal userIdentity, int id);
        Task<ResponseDto<List<GetOfferByIdDto>>> GetOffersByUser(string userLogin);

        Task<ResponseDto<int>> UpdateOffer(ClaimsPrincipal user, UpdateOfferDto offer);
    }
}
