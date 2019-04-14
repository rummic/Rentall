using System.Security.Claims;

namespace Rentall.Services.ModelServices.OfferService
{
    using System.Threading.Tasks;

    using Rentall.Services.Dtos;
    using Rentall.Services.Dtos.OfferDto;

    public interface IOffersService
    {
        Task<ResponseDto<GetOfferByIdDto>> GetOfferById(int id);
        Task<ResponseDto<int>> AddOffer(AddOfferDto offer);
        Task<ResponseDto<bool>> ChangeOfferActivity(int id);
        Task<ResponseDto<bool>> DeleteOffer(ClaimsPrincipal userIdentity, int id);
    }
}
